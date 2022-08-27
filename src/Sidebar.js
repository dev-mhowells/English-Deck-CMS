import "./index.css";

import React from "react";

export default function Sidebar(props) {
  // current article determines what is shown in display inputs
  // if empty string, nothing shown in inputs

  const nav = props.allArticles.map((article) => {
    return (
      <p
        className="article-link"
        onClick={() => props.setCurrentArticle(article)}
      >
        {article.meta.title}
      </p>
    );
  });

  return (
    <section className="sidebar">
      <div className="new-article">
        <h3 className="new-article-text">Create new article</h3>
        <button
          className="new-article-btn"
          onClick={() => props.setCurrentArticle("")}
        >
          +
        </button>
      </div>
      <div className="articles-display">{nav}</div>
    </section>
  );
}
