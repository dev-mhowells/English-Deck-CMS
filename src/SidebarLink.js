import React from "react";

export default function SidebarLink(props) {
  const [articleIsSelected, setArticleIsSelected] = React.useState();

  function updateSidebar() {
    props.setCurrentArticle(props.article);
  }

  // I DON'T LIKE BELOW CODE.. IT DOES NOT CATCH CASES WHERE CURRENT ARTICLE HAS
  // NO TITLE.. ALTHOUGH THIS SHOULD NEVER BE THE CASE..
  return (
    <p
      className={
        !props.currentArticle
          ? "article-link"
          : props.currentArticle.meta.title !== props.article.meta.title
          ? "article-link"
          : "article-link-selected"
      }
      onClick={updateSidebar}
    >
      {props.article.meta.title}
    </p>
  );
}
