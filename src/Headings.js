import "./index.css";
import React from "react";

export default function Headings(props) {
  function onImageUpload(event) {
    props.setImage(event.target.files[0]);
    props.setArticleInfo((prevArticleInfo) => ({
      ...prevArticleInfo,
      image: event.target.files[0].name,
    }));
  }

  // called on each keystroke
  const handleInfo = (key, event) => {
    let data = { ...props.articleInfo };
    data[key] = event.target.value;
    props.setArticleInfo(data);
  };

  function controlLevel(event) {
    props.setArticleInfo((prevArticleInfo) => ({
      ...prevArticleInfo,
      level: event.target.value,
    }));
  }

  console.log("THIS", props.articleInfo);

  return (
    <section className="headings">
      <div className="label-input">
        <label for="title">Title</label>
        <input
          type={"text"}
          id={"title"}
          name={"title"}
          value={props.articleInfo.title}
          onChange={(event) => handleInfo("title", event)}
        ></input>
      </div>
      <div className="label-input">
        <label for="author">Author</label>
        <input
          type={"text"}
          id={"author"}
          name={"author"}
          value={props.articleInfo.author}
          onChange={(event) => handleInfo("author", event)}
        ></input>
      </div>
      <div className="label-input">
        <label for="img">Image</label>
        <input
          type={"file"}
          id={"image"}
          name={"image"}
          accept={"image/*"}
          onChange={onImageUpload}
        ></input>
      </div>
      <div className="label-input">
        <label for="level">Level</label>
        <select
          id={"level"}
          name={"level"}
          value={props.articleInfo.level}
          onChange={(event) => controlLevel(event)}
        >
          <option value="beginner">beginner</option>
          <option value="intermediate">intermediate</option>
          <option value="advanced">advanced</option>
        </select>
      </div>
      <div className="label-input">
        <label for="summary">Summary</label>
        <textarea
          className="textarea"
          value={props.articleInfo.summary}
          onChange={(event) => handleInfo("summary", event)}
        ></textarea>
      </div>
      {/* <div className="label-input">
        <label for="themes">Themes</label>
        <input
          type={"text"}
          id={"themes"}
          name={"themes"}
          value={props.themes}
          onChange={handleThemes}
        ></input>
      </div> */}
    </section>
  );
}
