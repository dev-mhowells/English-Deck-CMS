import "./index.css";

export default function Paragraphs() {
  return (
    <section className="paragraphs">
      <div className="paragraph">
        <h2>Paragraphs</h2>
        <div className="above-para">
          <h3>Paragraph (1)</h3>
          <button className="delete-btn">delete</button>
        </div>
        <textarea className="textarea"></textarea>
        <p className="wordcount">words: 0000</p>
      </div>
      <button className="add-para">+</button>
    </section>
  );
}
