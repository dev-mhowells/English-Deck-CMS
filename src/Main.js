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
  const [image, setImage] = React.useState([]);

  const [articleInfo, setArticleInfo] = React.useState({
    title: "",
    author: "",
    image: "",
    level: "",
    summary: "",
  });

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
      // clear all fields if no current article - means no overlap between articles if a field
      // is not filled, otherwise state will remain from previously and still be something
      // from another article.

      if (props.currentArticle) {
        setArticleInfo(props.currentArticle.articleInfo);

        setParagraphs(props.currentArticle.paragraphs);
        setVocabulary(props.currentArticle.vocabulary);
        setQuiz(props.currentArticle.quiz);
      } else {
        setImage("");
        setArticleInfo({
          title: "",
          author: "",
          image: "",
          level: "",
          summary: "",
        });
        setParagraphs([{ number: 1, text: "", wordCount: 0 }]);
        setVocabulary([]);
        setQuiz([
          {
            question: "",
            answers: [],
            correct: "",
          },
        ]);
      }
    }

    populateFields();
  }, [props.currentArticle]);

  console.log("SHOT", articleInfo.title.split(" ").join(""));

  // ---------------------------------------------------------------- //

  async function updateDatabase() {
    if (articleInfo.title) {
      await setDoc(
        doc(db, "articles", articleInfo.title),
        {
          articleInfo,
          paragraphs: paragraphs,
          quiz: quiz,
          vocabulary: vocabulary,
          articleId: articleInfo.title.split(" ").join(""),
        },
        { merge: true }
      );
    } else console.log("No title, cannot update");
  }

  // uploads image to storage
  async function uploadImage() {
    if (image) {
      const imagesRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imagesRef, image).then((snapshot) => {});
    }
  }
  // -------------------------------------------------------- //

  // WHY IS THIS HERE I DONT THINK IT'S BEING USED
  // async function addToSidebar() {
  //   props.setAllArticles((prevArticles) => [...prevArticles, title]);
  // }

  return (
    <main className="main">
      <Headings
        setImage={setImage}
        image={image}
        articleInfo={articleInfo}
        setArticleInfo={setArticleInfo}
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
          props.setCurrentArticle("");
        }}
      >
        add article
      </button>
      {/* <button className="delete-article-btn" onClick={addToSidebar}>
        test function
      </button> */}
      <button className="delete-article-btn">delete article</button>
    </main>
  );
}

export default Main;
