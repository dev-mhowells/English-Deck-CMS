import "./index.css";
import React from "react";

export default function Vocabulary() {
  const [word, setWord] = React.useState("");
  const [vocabulary, setVocabulary] = React.useState([
    {
      word,
      paragraphNumber: "",
      definition: "",
      example: "",
      variations: [],
      type: "",
    },
  ]);

  const [selectedTab, setSelectedTab] = React.useState("");

  function handleWordChange(event) {
    setWord(event.target.value);
  }

  function addWord() {
    setVocabulary((prevVocabulary) => [
      ...prevVocabulary,
      {
        word,
        paragraphNumber: "",
        definition: "",
        example: "",
        variations: [],
        type: "",
      },
    ]);
  }

  function deleteWord(word) {
    setVocabulary((prevVocabulary) =>
      prevVocabulary.filter((vocabObj) => vocabObj.word !== word)
    );
  }

  function handleSelelctedTab(word) {
    setSelectedTab(word);
    console.log(word, "click ran");
  }

  const allWords = vocabulary.map((vocabObj, index) => {
    return (
      <div
        className="vocab-tab"
        onClick={() => handleSelelctedTab(vocabObj.word)}
      >
        {index === 0 ? "word" : vocabObj.word}
      </div>
    );
  });

  const wordDisplay = vocabulary
    .filter((wordObj) => wordObj.word === selectedTab)
    .map((filteredWordObj) => {
      console.log(filteredWordObj.word, "WORDDD");
      return (
        <div className="vocab-info">
          <div className="label-input">
            <label for="word">Word</label>
            <input
              type={"word"}
              id={"word"}
              name={"word"}
              onChange={handleWordChange}
              value={word}
            ></input>
          </div>
          <div className="label-input">
            <label for="paragraph-num">Paragraph number</label>
            <input
              type={"number"}
              id={"paragraph-num"}
              name={"paragraph-num"}
            ></input>
          </div>
          <div className="label-input">
            <label for={"definitions"}>Definitions</label>
            <input
              type={"input"}
              id={"definitions"}
              name={"definitions"}
            ></input>
          </div>
          <div className="label-input">
            <label for={"examples"}>Examples</label>
            <input type={"input"} id={"examples"} name={"examples"}></input>
          </div>
          <div className="label-input">
            <label for={"variations"}>Variations</label>
            <input type={"input"} id={"variations"} name={"variations"}></input>
          </div>
          <div className="label-input">
            <label for={"type"}>Type</label>
            <input type={"input"} id={"type"} name={"type"}></input>
          </div>
        </div>
      );
    });

  return (
    <section className="vocabulary-section">
      <h2>Vocabulary</h2>
      <div className="vocab-tabs">{allWords}</div>
      {wordDisplay}
      {/* <div className="vocab-info">
        <div className="label-input">
          <label for="word">Word</label>
          <input
            type={"word"}
            id={"word"}
            name={"word"}
            onChange={handleWordChange}
          ></input>
        </div>
        <div className="label-input">
          <label for="paragraph-num">Paragraph number</label>
          <input
            type={"number"}
            id={"paragraph-num"}
            name={"paragraph-num"}
          ></input>
        </div>
        <div className="label-input">
          <label for={"definitions"}>Definitions</label>
          <input type={"input"} id={"definitions"} name={"definitions"}></input>
        </div>
        <div className="label-input">
          <label for={"examples"}>Examples</label>
          <input type={"input"} id={"examples"} name={"examples"}></input>
        </div>
        <div className="label-input">
          <label for={"variations"}>Variations</label>
          <input type={"input"} id={"variations"} name={"variations"}></input>
        </div>
        <div className="label-input">
          <label for={"type"}>Type</label>
          <input type={"input"} id={"type"} name={"type"}></input>
        </div>
      </div> */}
      <div className="below-vocab">
        <button className="delete-word">delete word</button>
      </div>
      <button className="new-btn" onClick={addWord}>
        +
      </button>
    </section>
  );
}
