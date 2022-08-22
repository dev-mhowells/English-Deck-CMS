import "./index.css";
import React from "react";
import Word from "./Word";

export default function Vocabulary() {
  const [word, setWord] = React.useState("");
  const [vocabulary, setVocabulary] = React.useState([
    {
      //   word: word,
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

  // adds a word object to the list of word objects (vocabulary)
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
      prevVocabulary.filter((vocabObj) => vocabObj.word !== selectedTab)
    );
  }

  // grabs word object if selected tab === wordObj.word
  function findWordObj(word) {
    for (let wordObj of vocabulary) {
      if (wordObj.word === word) {
        setWord(wordObj.word);
      }
    }
  }

  function handleSelelctedTab(word) {
    setSelectedTab(word);
    findWordObj(word);
  }

  const allTabs = vocabulary.map((vocabObj, index) => {
    return (
      <div
        className="vocab-tab"
        onClick={() => handleSelelctedTab(vocabObj.word)}
      >
        {index === 0 ? "word" : vocabObj.word}
      </div>
    );
  });

  //   const allWords = vocabulary
  //     .filter((vocabObj) => vocabObj.word === selectedTab)
  //     .map((filteredVocabObj) => {
  //       console.log("match?", filteredVocabObj.word, selectedTab);
  //       return <Word vocabObj={filteredVocabObj} addWord2={addWord2} />;
  //     });

  return (
    <section className="vocabulary-section">
      <h2>Vocabulary</h2>
      <div className="vocab-tabs">{allTabs}</div>
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
      </div>
      <div className="below-vocab">
        <button className="delete-word" onClick={deleteWord}>
          delete word
        </button>
      </div>
      <button className="new-btn" onClick={addWord}>
        +
      </button>
    </section>
  );
}
