import "./index.css";
import Headings from "./Headings";
import Paragraphs from "./Paragraphs";
import Vocabulary from "./Vocabulary";
import VocabularyC from "./VocabularyC";
import Quiz from "./Quiz";

import React from "react";
import { db } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";

function Main(props) {
  // State for Headings.js
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [themes, setThemes] = React.useState("");
  const [level, setLevel] = React.useState("");

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
      console.log("MAIN USE EFFECT");
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

  console.log("THIS IS PARAGRAPHS", paragraphs);

  // ---------------------------------------------------------------- //

  async function updateDatabase() {
    await setDoc(
      doc(db, "articles", title),
      {
        meta: { title, author, themes, level },
        paragraphs: paragraphs,
        quiz: quiz,
        vocabulary: vocabulary,
      },
      { merge: true }
    );
  }

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
      />
      <Paragraphs paragraphs={paragraphs} setParagraphs={setParagraphs} />
      <Vocabulary
        vocabulary={vocabulary}
        setVocabulary={setVocabulary}
        currentArticle={props.currentArticle}
      />
      <Quiz quiz={quiz} setQuiz={setQuiz} />
      <button className="delete-article-btn" onClick={updateDatabase}>
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
