import "./index.css";
import React from "react";

export default function Quiz() {
  const [quiz, setQuiz] = React.useState([
    {
      question: "",
      answers: [],
    },
  ]);

  function newQA() {
    setQuiz((prevQuiz) => [
      ...prevQuiz,
      {
        question: "",
        answers: [],
      },
    ]);
  }

  function deleteQA(index) {
    setQuiz((prevQuiz) => prevQuiz.filter((QA, i) => index !== i));
  }

  function handleQChange(event, index) {
    let data = [...quiz];
    data[index].question = event.target.value;
    setQuiz(data);
  }

  function handleAChange(event, index, questionNum) {
    let data = [...quiz];
    data[index].answers[questionNum] = event.target.value;
    setQuiz(data);
  }

  console.log("QUIZ", quiz);

  const allQA = quiz.map((QA, index) => {
    return (
      <div>
        <div className="QA-set">
          <div className="label-input">
            <label for="question">Question ({index + 1})</label>
            <input
              id={"question"}
              type={"text"}
              name={"question"}
              value={QA.question}
              onChange={(event) => handleQChange(event, index)}
            ></input>
          </div>
          <div className="label-input">
            <label>Answers</label>
            <div className="answers">
              <input
                className="answer"
                value={QA.answers[0]}
                onChange={(event) => handleAChange(event, index, 0)}
              ></input>
              <input
                className="answer"
                value={QA.answers[1]}
                onChange={(event) => handleAChange(event, index, 1)}
              ></input>
              <input
                className="answer"
                value={QA.answers[2]}
                onChange={(event) => handleAChange(event, index, 2)}
              ></input>
              <input
                className="answer"
                value={QA.answers[3]}
                onChange={(event) => handleAChange(event, index, 3)}
              ></input>
            </div>
          </div>
        </div>
        <div className="below-QA">
          <button className="delete-word" onClick={() => deleteQA(index)}>
            delete word
          </button>
        </div>
      </div>
    );
  });

  return (
    <section className="quiz-section">
      <h2>Quiz</h2>
      {allQA}
      {/* <div className="QA-set">
        <div className="label-input">
          <label for="question">Question (1)</label>
          <input id={"question"} type={"text"} name={"question"}></input>
        </div>
        <div className="label-input">
          <label>Answers</label>
          <div className="answers">
            <input className="answer"></input>
            <input className="answer"></input>
            <input className="answer"></input>
            <input className="answer"></input>
          </div>
        </div>
      </div>
      <div className="below-QA">
        <button className="delete-word">delete word</button>
      </div> */}
      <button className="new-btn" onClick={newQA}>
        +
      </button>
    </section>
  );
}
