import "./index.css";
import React from "react";

export default function Vocabulary(props) {
  // ------------------------------- FIELD INPUT STATES --------------------------//
  const [word, setWord] = React.useState("");
  const [definition, setDefinition] = React.useState("");
  const [example, setExample] = React.useState("");
  const [paraNum, setParaNum] = React.useState("");
  const [variation, setVariation] = React.useState("");
  const [variations, setVariations] = React.useState([]);

  // -------------------------------  --------------------------//
  const [selectedTab, setSelectedTab] = React.useState("");
  const [editing, setEditing] = React.useState(false);

  // -------------------------------  --------------------------//

  function handleWordChange(event) {
    setWord(event.target.value);
  }

  function handleDefChange(event) {
    setDefinition(event.target.value);
  }

  function handleExampleChange(event) {
    setExample(event.target.value);
  }

  function handleParaNumChange(event) {
    setParaNum(event.target.value);
  }

  function handleVariation(event) {
    setVariation(event.target.value);
  }

  function addVariation() {
    setVariations((prevVariations) => [...prevVariations, variation]);
    // clear current variation field
    setVariation("");
  }

  function removeVariation(currentVariation) {
    setVariations((prevVariations) =>
      prevVariations.filter((variation) => variation !== currentVariation)
    );
  }

  function clearFields() {
    setWord("");
    setDefinition("");
    setExample("");
    // for variations
    setVariation("");
    setVariations([]);

    //also clear selected tab and reselt editing
    setSelectedTab("");
    setEditing(false);
  }

  // reset all feilds on article change, so fields are not autofilled
  // with selected data from previously selected article
  React.useEffect(() => {
    clearFields();
  }, [props.currentArticle]);

  // adds a word object to the list of word objects (vocabulary)
  function addWord() {
    // check if word already exists before adding it
    for (let wordObj of props.vocabulary) {
      if (wordObj.word === word) {
        return;
      }
    }
    props.setVocabulary((prevVocabulary) => [
      ...prevVocabulary,
      {
        word,
        paragraphNumber: paraNum,
        definition,
        example,
        variations,
        type: "",
      },
    ]);
    clearFields();
  }

  function saveWord() {
    // saving word so editing no longer true, this controls whether
    // save edit button shows
    setEditing(false);

    props.setVocabulary((prevVocabulary) =>
      prevVocabulary.map((wordObj) => {
        if (wordObj.word === selectedTab) {
          return {
            ...wordObj,
            word: word,
            definition: definition,
            example: example,
            paragraphNumber: paraNum,
            variations,
          };
        } else return wordObj;
      })
    );
    clearFields();
  }
  console.log("VOCABULARY", props.vocabulary);

  function deleteWord(word) {
    // not used yet
    let deletedIndex;

    props.setVocabulary((prevVocabulary) =>
      prevVocabulary.filter((vocabObj, index) => {
        deletedIndex = index;
        return vocabObj.word !== selectedTab;
      })
    );
    clearFields();
  }

  // grabs word object if selected tab === wordObj.word
  // called on tab change and changes state corresponding to input feilds
  function findWordObj(word) {
    for (let wordObj of props.vocabulary) {
      if (wordObj.word === word) {
        setWord(wordObj.word);
        setDefinition(wordObj.definition);
        setExample(wordObj.example);
        setParaNum(wordObj.paragraphNumber);
        // BECAUSE THIS FEATURE WAS ADDED AFTER ARTICLES POSTED, FIRST NEED TO
        // CHECK IF ARTICLE HAS VARIATIONS
        wordObj.variations
          ? setVariations(wordObj.variations)
          : setVariations([]);
      }
    }
  }

  // changes tab, calls findWordObj to match tab with object in vocab array
  function handleSelelctedTab(word) {
    setSelectedTab(word);
    findWordObj(word);
  }

  // ------------------------------- DETERMINES WHETHER USER IS EDITING --------------------------//

  // compares two objects, current object with fields in state defined in
  // alreadyAdded() and the object in the vocabulary array
  function compareObjects(obj1, obj2) {
    // provided the keys in both objects are the same,
    // below checks equality of values
    for (let key of Object.keys(obj1)) {
      console.log("KEY CHECK", obj1[key], obj2[key]);
      if (obj1[key] !== obj2[key]) {
        console.log("MISMATCH PAIR", obj1[key], obj2[key]);
        setEditing(true);
        return;
      } else setEditing(false);
    }
  }

  // checks if the currently seleced tab/wordObj is already saved
  function alreadyAdded() {
    // represents current display inside vocab ie all state which populates fields
    // are turned into this object
    let currentState = {
      paragraphNumber: paraNum,
      variations,
      type: "",
      word,
      definition,
      example,
    };

    console.log("this is current state", currentState.variations);

    // saved obj becomes the currently selected object from vocab array
    let savedObj;
    // sets savedObj based on currently selected tab to find matchin obj in vocab arr
    for (let wordObj of props.vocabulary) {
      if (wordObj.word === selectedTab) {
        savedObj = wordObj;
      }
    }

    // need if statement because on first load, savedObj is undefined(empty)
    if (savedObj) compareObjects(currentState, savedObj);
    if (savedObj)
      console.log(
        "THIS IS SAVED OBJ >",
        savedObj,
        "THIS IS CURRENT STATE>",
        currentState
      );
  }

  // alreadyAdded works as a comparison check to see if the current state of the
  // vocab object is the same as the previously saved state, if not, sets editing to
  // true and allows for save edit button to work
  React.useEffect(() => {
    if (!props.vocabulary) return;

    alreadyAdded();
  }, [word, definition, example, paraNum, variations]);

  console.log("THIS IS PARANUM ----", paraNum);

  // ------------------------------- RENDERED ELEMENTS --------------------------//

  // renders all tabs based on number of word objects in vocabulary array
  const allTabs = props.vocabulary.map((vocabObj, index) => {
    if (props.vocabulary[0]) {
      return (
        <div
          className={
            vocabObj.word !== selectedTab ? "vocab-tab" : "vocab-tab-selected"
          }
          onClick={() => handleSelelctedTab(vocabObj.word)}
        >
          {vocabObj.word}
        </div>
      );
    }
  });

  console.log("this is variations", variations);

  const variationsDisplay =
    variations &&
    variations.map((variation) => {
      return (
        <button onClick={() => removeVariation(variation)}>{variation}</button>
      );
    });

  return (
    <section className="vocabulary-section">
      <h2>Vocabulary</h2>
      <div className="vocab-tabs">
        {allTabs}
        <div
          className={selectedTab === "" ? "vocab-tab-selected" : "vocab-tab"}
          onClick={clearFields}
        >
          +
        </div>
      </div>
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
            value={paraNum}
            onChange={handleParaNumChange}
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
          <label for={"examples"}>Example</label>
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
          <input
            type={"input"}
            id={"variations"}
            name={"variations"}
            onChange={handleVariation}
            value={variation}
          ></input>
          <button onClick={addVariation}>add</button>
        </div>
        <div>{variations && variationsDisplay}</div>
        {/* <div className="label-input">
          <label for={"type"}>Type</label>
          <input type={"input"} id={"type"} name={"type"}></input>
        </div> */}
      </div>
      <div className="below-vocab">
        <button className="delete-word" onClick={deleteWord}>
          delete word
        </button>
      </div>
      {editing && (
        <button className={"new-btn save-word"} onClick={saveWord}>
          save edit
        </button>
      )}
      {selectedTab && !editing && (
        <button className="new-btn not-editing">save edit</button>
      )}
      {!selectedTab && (
        <button className="new-btn" onClick={addWord}>
          add word to list
        </button>
      )}
    </section>
  );
}
