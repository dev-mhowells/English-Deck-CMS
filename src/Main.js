import "./index.css";
import Headings from "./Headings";
import Paragraphs from "./Paragraphs";
import Vocabulary from "./Vocabulary";
import Quiz from "./Quiz";

import React from "react";

function Main() {

  // State for Headings.js
  const [title, setTitle] = React.useState("")
  const [author, setAuthor] = React.useState("")
  const [themes, setThemes] = React.useState("")
  const [level, setLevel] = React.useState("")

  return (
    <main className="main">
      <Headings title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} themes={themes} setThemes={setThemes} level={level} setLevel={setLevel}/>
      <Paragraphs />
      <Vocabulary />
      <Quiz />
      <button className="delete-article-btn">delete article</button>
    </main>
  );
}

export default Main;
