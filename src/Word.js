import React from "react";

export default function Word(props) {
  // const [word, setWord] = React.useState({});
  const [word, setWord] = React.useState("");
  const [definition, setDefinition] = React.useState("");
  const [example, setExample] = React.useState("");

  // function handleWordChange(event) {
  //   setWord({ word: event.target.value });
  // }
  console.log("THIS PROPS", props.selectedObj.word);

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
    for (let wordObj of props.vocabulary) {
      if (wordObj.word === word) {
        return;
      }
    }

    props.setVocabulary((prevVocabulary) => [
      ...prevVocabulary,
      {
        word,
        paragraphNumber: "",
        definition,
        example,
        // variations: [],
        type: "",
      },
    ]);
    clearFields();
  }

  // needed to clear inputs, which clears states, then set state using passed in value
  React.useEffect(() => {
    clearFields();
    setWord(props.selectedObj.word);
  }, [props.selectedTab]);

  function deleteWord(word) {
    props.setVocabulary((prevVocabulary) =>
      prevVocabulary.filter((vocabObj) => vocabObj.word !== props.selectedTab)
    );
  }

  // ABOVE FINE
  console.log("SELECTED IS", word);
  // ----------------------------------------------------------

  const [editing, setEditing] = React.useState(false);

  // compares two objects, current object with fields in state defined in
  // alreadyAdded() and the object in the vocabulary array
  function compareObjects(obj1, obj2) {
    // provided the keys in both objects are the same,
    // below checks equality of values
    for (let key of Object.keys(obj1)) {
      console.log("KEY CHECK", obj1[key], obj2[key]);
      if (obj1[key] && obj2[key] && obj1[key] !== obj2[key]) {
        console.log("MISMATCH PAIR", obj1[key], obj2[key]);
        setEditing(true);
        return;
      } else setEditing(false);
    }
  }

  // // adds a word object to the list of word objects (vocabulary)
  // function addWord() {
  //     setVocabulary((prevVocabulary) => [
  //       ...prevVocabulary,
  //       {
  //         word: word,
  //         paragraphNumber: "",
  //         definition: "",
  //         example: "",
  //         variations: [],
  //         type: "",
  //       },
  //     ]);
  //   }

  // console.log("component rendered is now for:", word.word);
  console.log("component rendered is now for:", word);

  return (
    <section className="word-block">
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
        {editing && <button className="save-word">save edit</button>}
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
