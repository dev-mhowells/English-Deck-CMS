import "./index.css";
import SidebarLink from "./SidebarLink";

import React from "react";

export default function Sidebar(props) {
  // THIS COMPONENT NEEDS TO RE-RENDER ON 'ADD ARTICLE'

  // const [articleIsSelected, setArticleIsSelected] = React.useState();

  // function higlightSelected(event) {
  //   if (event.target.innerText === props.currentArticle.meta.title) {
  //     setArticleIsSelected(true);
  //     console.log("THERE IS A MATCH HERE");
  //   }
  //   console.log("WHAT IS IT", props.currentArticle.meta.title);
  // }

  // console.log("ARTICLEIS SELECTED", articleIsSelected);

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
