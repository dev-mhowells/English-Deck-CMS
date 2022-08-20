import "./index.css";

export default function Headings() {
  return (
    <section className="headings">
      <div className="label-input">
        <label for="title">Title</label>
        <input type={"text"} id={"title"} name={"title"}></input>
      </div>
      <div className="label-input">
        <label for="author">Author</label>
        <input type={"author"} id={"author"} name={"author"}></input>
      </div>
      <div className="label-input">
        <label for="themes">Themes</label>
        <input type={"themes"} id={"themes"} name={"themes"}></input>
      </div>
      <div className="label-input">
        <label for="level">Level</label>
        <input type={"level"} id={"level"} name={"level"}></input>
      </div>
    </section>
  );
}
