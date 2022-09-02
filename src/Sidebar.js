import "./index.css";
import SidebarLink from "./SidebarLink";

import React from "react";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "./firebase-config";

export default function Sidebar(props) {
  // current article determines what is shown in display inputs
  // if empty string, nothing shown in inputs
  const nav = props.allArticles.map((article) => {
    return (
      <SidebarLink
        article={article}
        setCurrentArticle={props.setCurrentArticle}
        currentArticle={props.currentArticle}
      />
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
