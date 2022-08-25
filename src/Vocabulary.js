import "./index.css";
import React from "react";
import Word from "./Word";

export default function Vocabulary() {
  const [word, setWord] = React.useState("");
  const [definition, setDefinition] = React.useState("");
  const [example, setExample] = React.useState("");
  const [vocabulary, setVocabulary] = React.useState([]);

  const [selectedTab, setSelectedTab] = React.useState("");

  function handleWordChange(event) {
    setWord(event.target.value);
  }

  function handleDefChange(event) {
    setDefinition(event.target.value);
  }

  function handleExampleChange(event) {
    setExample(event.target.value);
  }

  function clearFields() {
    setWord("");
    setDefinition("");
    setExample("");
  }

  // adds a word object to the list of word objects (vocabulary)
  function addWord() {
    // check if word already exists before adding it
    for (let wordObj of vocabulary) {
      if (wordObj.word === word) {
        return;
      }
    }
    setVocabulary((prevVocabulary) => [
      ...prevVocabulary,
      {
        word,
        paragraphNumber: "",
        definition,
        example,
        variations: [],
        type: "",
      },
    ]);
    clearFields();
  }

  function deleteWord(word) {
    setVocabulary((prevVocabulary) =>
      prevVocabulary.filter((vocabObj) => vocabObj.word !== selectedTab)
    );
  }

  // grabs word object if selected tab === wordObj.word
  // called on tab change and changes state corresponding to input feilds
  function findWordObj(word) {
    for (let wordObj of vocabulary) {
      if (wordObj.word === word) {
        setWord(wordObj.word);
        setDefinition(wordObj.definition);
        setExample(wordObj.example);
      }
    }
  }

  // changes tab, calls findWordObj to match tab with object in vocab array
  function handleSelelctedTab(word) {
    setSelectedTab(word);
    findWordObj(word);
  }

  // renders all tabs based on number of word objects in vocabulary array
  const allTabs = vocabulary.map((vocabObj, index) => {
    if (vocabulary[0]) {
      return (
        <div
          className="vocab-tab"
          onClick={() => handleSelelctedTab(vocabObj.word)}
        >
          {vocabObj.word}
        </div>
      );
    }
  });

  const [editing, setEditing] = React.useState(false);

  function alreadyAdded() {
    let currentState = {
      paragraphNumber: "",
      variations: [],
      type: "",
      word,
      definition,
      example,
    };

    let savedObj;

    for (let wordObj of vocabulary) {
      if (wordObj.word === selectedTab) {
        savedObj = wordObj;
      }
    }

    console.log("current state", currentState, "savedObj", savedObj);

    currentState.word !== savedObj.word ? setEditing(true) : setEditing(false);
    console.log(
      "DOES CURRENT STATE = SAVED OBJ?",
      currentState.word === savedObj.word
    );
  }

  console.log("editing", editing);

  React.useEffect(() => {
    if (!vocabulary) return;

    alreadyAdded();
  }, [word]);
  //   const allWords = vocabulary
  //     .filter((vocabObj) => vocabObj.word === selectedTab)
  //     .map((filteredVocabObj) => {
  //       console.log("match?", filteredVocabObj.word, selectedTab);
  //       return <Word vocabObj={filteredVocabObj} addWord2={addWord2} />;
  //     });

  console.log("VOCABULARY", vocabulary);

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
          <label for={"definition"}>Definition</label>
          <input
            type={"input"}
            id={"definition"}
            name={"definition"}
            onChange={handleDefChange}
            value={definition}
          ></input>
        </div>
        <div className="label-input">
          <label for={"examples"}>Examples</label>
          <input
            type={"input"}
            id={"examples"}
            name={"examples"}
            onChange={handleExampleChange}
            value={example}
          ></input>
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
