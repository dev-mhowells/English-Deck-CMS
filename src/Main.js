import "./index.css";
import Headings from "./Headings";
import Paragraphs from "./Paragraphs";
import Vocabulary from "./Vocabulary";
import VocabularyC from "./VocabularyC";
import Quiz from "./Quiz";

import React from "react";
import { db } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";

function Main() {
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
      correct: ""
    },
  ]);

  const [vocabulary, setVocabulary] = React.useState([]);

  //new - collection
  //meta - document - acts as object
  //title - key value pair
  //specify merge so that whole doc is not overwritten
  // React.useEffect(() => {
  //   console.log("USE EFFECT RAN");
  //   async function testUpdate() {
  //     // example metadata
  //     await setDoc(
  //       doc(db, "new", "meta"),
  //       {
  //         title: "test-title",
  //         author: "me",
  //         themes: ["story", "tale"],
  //         level: "advanced",
  //       },
  //       { merge: true }
  //     );
  // example paragraphs
  // await setDoc(
  //   doc(db, "new", "paragraphs"),
  //   {
  //     para1: "some text",
  //     para2: "some more text",
  //   },
  //   { merge: true }
  // );
  //     // example flashcards (could also use word as the key to each object)
  //     await setDoc(
  //       doc(db, "new", "flashcards"),
  //       {
  //         card1: {
  //           word: "word",
  //           definition: "something",
  //           example: "this is an example",
  //         },
  //         card2: {
  //           word: "word",
  //           definition: "something",
  //           example: "this is an example",
  //         },
  //       },
  //       { merge: true }
  //     );
  //     // example questions
  //     await setDoc(
  //       doc(db, "new", "quiz"),
  //       {
  //         question1: {
  //           question: "something?",
  //           answers: ["answer1", "answer2"],
  //           correct: "answer1",
  //         },
  //         question2: {
  //           question: "something?",
  //           answers: ["answer1", "answer2"],
  //           correct: "answer1",
  //         },
  //       },
  //       { merge: true }
  //     );
  //   }
  //   testUpdate();
  // }, []);

  async function updateDatabase() {
    await setDoc(
      doc(db, "new", "meta"),
      {
        title,
        author,
        themes,
        level,
      },
      { merge: true }
    );
    await setDoc(doc(db, "new", "paragraphs"), { paragraphs }, { merge: true });
    await setDoc(doc(db, "new", "quiz"), { quiz }, { merge: true });
    await setDoc(doc(db, "new", "flashcards"), { vocabulary }, { merge: true });
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
      <button className="delete-article-btn">delete article</button>
    </main>
  );
}

export default Main;
