import "./index.css";
import React from "react";
import Word from "./Word";

export default function VocabularyC() {
  const [vocabulary, setVocabulary] = React.useState([{}]);
  const [selectedTab, setSelectedTab] = React.useState("");

  // grabs word object if selected tab === wordObj.word
  // called on tab change and changes state corresponding to input feilds
  //   function findWordObj(word) {
  //     for (let wordObj of vocabulary) {
  //       if (wordObj.word === word) {
  //         setWord(wordObj.word);
  //         setDefinition(wordObj.definition);
  //         setExample(wordObj.example);
  //       }
  //     }
  //   }

  // changes tab, calls findWordObj to match tab with object in vocab array
  function handleSelelctedTab(word) {
    setSelectedTab(word);
    // findWordObj(word);
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

  //   // checks if the currently seleced tab/wordObj is already saved
  //   function alreadyAdded() {
  //     // array commented out because resluts in the comparison coming out false,
  //     // even if both arrays are empty. probably something to do with shallow and
  //     // deep comparison

  //     // represents current display inside vocab ie all state which populates fields
  //     // are turned into this object
  //     let currentState = {
  //       paragraphNumber: "",
  //       //   variations: [],
  //       type: "",
  //       word,
  //       definition,
  //       example,
  //     };

  //     // saved obj becomes the currently selected object from vocab array
  //     let savedObj;
  //     // sets savedObj based on currently selected tab to find matchin obj in vocab arr
  //     for (let wordObj of vocabulary) {
  //       if (wordObj.word === selectedTab) {
  //         savedObj = wordObj;
  //       }
  //     }

  //     console.log("current state", currentState, "savedObj", savedObj);

  //     // need if statement because on first load, savedObj is undefined(empty)
  //     if (savedObj) compareObjects(currentState, savedObj);
  //   }

  //   console.log("editing", editing);

  //   React.useEffect(() => {
  //     if (!vocabulary) return;

  //     alreadyAdded();
  //   }, [word]);
  //   const allWords = vocabulary
  //     .filter((vocabObj) => vocabObj.word === selectedTab)
  //     .map((filteredVocabObj) => {
  //       console.log("match?", filteredVocabObj.word, selectedTab);
  //       return <Word vocabObj={filteredVocabObj} addWord2={addWord2} />;
  //     });

  console.log("VOCABULARY", vocabulary);
  console.log("SELECTED TAB", selectedTab);

  const allWords = vocabulary.map((wordObj) => (
    <Word
      vocabulary={vocabulary}
      setVocabulary={setVocabulary}
      selectedTab={selectedTab}
    />
  ));

  const test = vocabulary
    .filter((wordObj) => {
      return wordObj.word === selectedTab;
    })
    .map((filteredWordObj) => {
      console.log("wo)))))000", filteredWordObj);
      return (
        <Word
          selectedObj={filteredWordObj}
          vocabulary={vocabulary}
          setVocabulary={setVocabulary}
          selectedTab={selectedTab}
        />
      );
    });

  console.log("FILTER FOR SELECTED ONLY", test);

  return (
    <section className="vocabulary-section">
      <h2>Vocabulary</h2>
      <div className="vocab-tabs">{allTabs}</div>
      {test}
    </section>
  );
}
