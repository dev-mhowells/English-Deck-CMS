import "./index.css";
import React from "react";

export default function Headings(props) {
  // toggles to allow image change, also allows showing file name when
  // switching to new tab. Solution for noe because cannot set value
  // of file inputs b/c security. When set to true allows uploading of new image
  const [changeImage, setChangeImage] = React.useState(false);

  function onImageUpload(event) {
    // image state is whole file which is uploaded to storage
    props.setImage(event.target.files[0]);
    // creates reference to image name and saves in database
    props.setArticleInfo((prevArticleInfo) => ({
      ...prevArticleInfo,
      image: event.target.files[0].name,
    }));
    // closes file upload display
    setChangeImage(false);
  }

  // called on each keystroke, updates articleInfo object
  const handleInfo = (key, event) => {
    let data = { ...props.articleInfo };
    data[key] = event.target.value;
    props.setArticleInfo(data);
  };

  // handles the dropdown for selecting article level
  function controlLevel(event) {
    props.setArticleInfo((prevArticleInfo) => ({
      ...prevArticleInfo,
      level: event.target.value,
    }));
  }

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
        {!props.articleInfo.image || changeImage ? (
          <input
            type={"file"}
            id={"image"}
            name={"image"}
            accept={"image/*"}
            onChange={onImageUpload}
          ></input>
        ) : (
          <div className="image-name">
            <p>{props.articleInfo.image}</p>
            <button onClick={() => setChangeImage(true)}>change image</button>
          </div>
        )}
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
