import "./index.css";

export default function Vocabulary() {
  return (
    <section className="vocabulary-section">
      <h2>Vocabulary</h2>
      <div className="above-vocab">
        <h3>Set (1)</h3>
        <button className="delete-btn">delete set</button>
      </div>
      <div className="tabs"></div>
      <div className="vocab-info">
        <div className="label-input">
          <label for="word">Word</label>
          <input type={"word"} id={"word"} name={"word"}></input>
        </div>
        <div className="label-input">
          <label for="definitions">Definitions</label>
          <input type={"input"} id={"definitions"} name={"definitions"}></input>
        </div>
        <div className="label-input">
          <label for="examples">Examples</label>
          <input type={"input"} id={"examples"} name={"examples"}></input>
        </div>
        <div className="label-input">
          <label for="variations">Variations</label>
          <input type={"input"} id={"variations"} name={"variations"}></input>
        </div>
        <div className="label-input">
          <label for="type">Type</label>
          <input type={"input"} id={"type"} name={"type"}></input>
        </div>
      </div>
      <button className="new-btn">new set</button>
    </section>
  );
}
