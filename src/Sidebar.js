import "./index.css";

import React from "react";

export default function Sidebar(props) {
  const nav = props.allArticles.map((article) => {
    return <p className="article-link">{article.meta.title}</p>;
  });

  return (
    <section className="sidebar">
      <div className="new-article">
        <h3 className="new-article-text">Create new article</h3>
        <button className="new-article-btn">+</button>
      </div>
      <div className="articles-display">{nav}</div>
    </section>
  );
}
