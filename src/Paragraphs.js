import "./index.css";
import React from "react";

export default function Paragraphs(props) {
  
  function addParagraph() {
    props.setParagraphs((prevParagraphs) => [
      ...prevParagraphs,
      { number: props.paragraphs.length + 1, text: "", wordCount: 0 },
    ]);
  }

  // filter finds the paragraph to be deleted based on the paragraph object's
  // number property. Map resets the number property for each paragraph object
  // to account for the newly missing paragraph.
  function deleteParagraph(paragraphNumber) {
    props.setParagraphs((prevParagraphs) =>
      prevParagraphs
        .filter((paragraph) => paragraph.number !== paragraphNumber + 1)
        .map((paragraph, index) => ({ ...paragraph, number: index + 1 }))
    );
  }

  // called on each keystroke
  const handleText = (index, event) => {
    let data = [...props.paragraphs];
    // correct paragraph's text property is updated onChange of input value
    data[index].text = event.target.value;
    // word count off by 1.. need to play with this
    data[index].wordCount = event.target.value.split(" ").length;
    props.setParagraphs(data);
  };

  const allParagrpahs = props.paragraphs.map((paragraph, index) => (
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
        <p className="wordcount">words: {paragraph.wordCount}</p>
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
