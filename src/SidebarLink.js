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
          : props.currentArticle.articleInfo.title !==
            props.article.articleInfo.title
          ? "article-link"
          : "article-link-selected"
      }
      //   className="article-link"
      onClick={updateSidebar}
    >
      {props.article.articleInfo.title}
    </p>
  );
}
