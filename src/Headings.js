import "./index.css";
import React from "react";

export default function Headings(props) {
  function handleTitle(event) {
    props.setTitle(event.target.value);
  }

  function handleAuthor(event) {
    props.setAuthor(event.target.value);
  }

  function handleThemes(event) {
    props.setThemes(event.target.value);
  }

  function handleLevel(event) {
    props.setLevel(event.target.value);
  }

  function onImageUpload(event) {
    props.setImage(event.target.files);
  }

  console.log("IMAGE", props.image, typeof props.image);

  return (
    <section className="headings">
      <div className="label-input">
        <label for="title">Title</label>
        <input
          type={"text"}
          id={"title"}
          name={"title"}
          value={props.title}
          onChange={handleTitle}
        ></input>
      </div>
      <div className="label-input">
        <label for="author">Author</label>
        <input
          type={"text"}
          id={"author"}
          name={"author"}
          value={props.author}
          onChange={handleAuthor}
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
      <div className="label-input">
        <label for="level">Level</label>
        <input
          type={"level"}
          id={"level"}
          name={"level"}
          value={props.level}
          onChange={handleLevel}
        ></input>
      </div>
    </section>
  );
}
