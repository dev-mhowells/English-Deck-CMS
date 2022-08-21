import "./index.css";
import React from "react";

export default function Paragraphs() {
  const [paragraphs, setParagraphs] = React.useState([
    { number: 1, text: "", wordCount: 0 },
  ]);

  function addParagraph() {
    setParagraphs((prevParagraphs) => [
      ...prevParagraphs,
      { number: paragraphs.length + 1, text: "", wordCount: 0 },
    ]);
  }

  function deleteParagraph(paragraphNumber) {
    setParagraphs((prevParagraphs) =>
      prevParagraphs.filter(
        (paragraph) => paragraph.number !== paragraphNumber + 1
      )
    );
  }

  const allParagrpahs = paragraphs.map((paragraph, index) => (
    <div className="paragraph">
      <div className="above-para">
        <h3>Paragraph ({index})</h3>
        <button className="delete-btn" onClick={() => deleteParagraph(index)}>
          delete
        </button>
      </div>
      <textarea className="textarea"></textarea>
      <p className="wordcount">words: 0000</p>
    </div>
  ));

  return (
    <section className="paragraphs">
      <h2>Paragraphs</h2>
      {allParagrpahs}
      <button className="add-para" onClick={addParagraph}>
        +
      </button>
    </section>
  );
}
