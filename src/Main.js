import "./index.css";
import Headings from "./Headings";
import Paragraphs from "./Paragraphs";
import Vocabulary from "./Vocabulary";
import Quiz from "./Quiz";

import React from "react";
import { db, storage } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function Main(props) {
  // State for Headings.js
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [themes, setThemes] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [image, setImage] = React.useState([]);

  // ------------------------------------------------- //

  const [paragraphs, setParagraphs] = React.useState([
    { number: 1, text: "", wordCount: 0 },
  ]);

  const [quiz, setQuiz] = React.useState([
    {
      question: "",
      answers: [],
      correct: "",
    },
  ]);

  const [vocabulary, setVocabulary] = React.useState([]);

  // ---------------------------------------------------------------- //
  // if current article selected:

  React.useEffect(() => {
    function populateFields() {
      // clear all fields first - means no overlap between articles if a field
      // is not filled, otherwise state will remain from previously and still be something
      // from another article.

      if (props.currentArticle) {
        setTitle(props.currentArticle.meta.title);
        setAuthor(props.currentArticle.meta.author);
        setThemes(props.currentArticle.meta.themes);
        setLevel(props.currentArticle.meta.level);

        setParagraphs(props.currentArticle.paragraphs);
        setVocabulary(props.currentArticle.vocabulary);
        setQuiz(props.currentArticle.quiz);
      } else {
        setTitle("");
        setAuthor("");
        setThemes("");
        setLevel("");
      }
    }

    populateFields();
  }, [props.currentArticle]);

  // ---------------------------------------------------------------- //

  async function updateDatabase() {
    await setDoc(
      doc(db, "articles", title),
      {
        meta: { title, author, themes, level, image: image[0].name },
        paragraphs: paragraphs,
        quiz: quiz,
        vocabulary: vocabulary,
      },
      { merge: true }
    );
  }

  // should only ever be one image, but image state from
  // file input is an arr. image[0].name is the name of the
  // originally uploaded file
  async function uploadImage() {
    const imagesRef = ref(storage, `images/${image[0].name}`);
    await uploadBytes(imagesRef, image[0]).then((snapshot) => {});
  }
  // -------------------------------------------------------- //

  async function addToSidebar() {
    props.setAllArticles((prevArticles) => [...prevArticles, title]);
  }

  return (
    <main className="main">
      <Headings
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        themes={themes}
        setThemes={setThemes}
        level={level}
        setLevel={setLevel}
        setImage={setImage}
        image={image}
      />
      <Paragraphs paragraphs={paragraphs} setParagraphs={setParagraphs} />
      <Vocabulary
        vocabulary={vocabulary}
        setVocabulary={setVocabulary}
        currentArticle={props.currentArticle}
      />
      <Quiz quiz={quiz} setQuiz={setQuiz} />
      <button
        className="delete-article-btn"
        onClick={() => {
          updateDatabase();
          uploadImage();
        }}
      >
        add article
      </button>
      <button className="delete-article-btn" onClick={addToSidebar}>
        test function
      </button>
      <button className="delete-article-btn">delete article</button>
    </main>
  );
}

export default Main;
