import React from "react";

export default function Word(props) {
  const [word, setWord] = React.useState({});

  function handleWordChange(event) {
    setWord({ word: event.target.value });
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

  console.log("component rendered is now for:", word.word);

  return (
    <div>
      <div className="vocab-info">
        <div className="label-input">
          <label for="word">Word</label>
          <input
            type={"word"}
            id={"word"}
            name={"word"}
            onChange={handleWordChange}
            value={word.word}
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
        <button className="delete-word">delete word</button>
      </div>
      <button className="new-btn" onClick={() => props.addWord2(word)}>
        +
      </button>
    </div>
  );
}
