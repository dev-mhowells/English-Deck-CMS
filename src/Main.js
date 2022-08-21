import "./index.css";
import Headings from "./Headings";
import Paragraphs from "./Paragraphs";
import Vocabulary from "./Vocabulary";
import Quiz from "./Quiz";

function Main() {
  return (
    <main className="main">
      <Headings />
      <Paragraphs />
      <Vocabulary />
      <Quiz />
      <button className="delete-article-btn">delete article</button>
    </main>
  );
}

export default Main;
