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
    await setDoc(doc(db, "titles", title), { title }, { merge: true });
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
      <Vocabulary vocabulary={vocabulary} setVocabulary={setVocabulary} />
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
