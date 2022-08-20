import "./index.css";

export default function Quiz() {
  return (
    <section className="quiz-section">
      <h2>Quiz</h2>
      <div className="QA-set">
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
    </section>
  );
}
