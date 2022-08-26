import "./index.css";
import React from "react";

export default function Paragraphs() {
  // save function not needed here as all paragraphs are in a single state
  // which is continually monitored

  const [text, setText] = React.useState("");
  const [paragraphs, setParagraphs] = React.useState([
    { number: 1, text: "", wordCount: 0 },
  ]);

  function addParagraph() {
    setParagraphs((prevParagraphs) => [
      ...prevParagraphs,
      { number: paragraphs.length + 1, text: "", wordCount: 0 },
    ]);
  }

  // filter finds the paragraph to be deleted based on the paragraph object's
  // number property. Map resets the number property for each paragraph object
  // to account for the newly missing paragraph.
  function deleteParagraph(paragraphNumber) {
    setParagraphs((prevParagraphs) =>
      prevParagraphs
        .filter((paragraph) => paragraph.number !== paragraphNumber + 1)
        .map((paragraph, index) => ({ ...paragraph, number: index + 1 }))
    );
  }

  const handleText = (index, event) => {
    let data = [...paragraphs];
    data[index].text = event.target.value;
    setParagraphs(data);
  };

  // POSSIBLY DEFUNCT
  //   function saveText(paragraphNumber) {
  //     setParagraphs((prevParagraphs) =>
  //       prevParagraphs.map((paragraph) => {
  //         if (paragraph.number === paragraphNumber) return { ...paragraph, text };
  //         else return paragraph;
  //       })
  //     );
  //   }

  console.log("PARAGRAPHS", paragraphs);
  console.log("TEXT", text);

  const allParagrpahs = paragraphs.map((paragraph, index) => (
    <div className="paragraph">
      <div className="above-para">
        <h3>Paragraph ({paragraph.number})</h3>
      </div>
      <textarea
        className="textarea"
        value={paragraph.text}
        onChange={(event) => handleText(index, event)}
      ></textarea>
      <div className="below-para">
        <p className="wordcount">words: 0000</p>
        <button className="delete-btn" onClick={() => deleteParagraph(index)}>
          delete
        </button>
      </div>
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
