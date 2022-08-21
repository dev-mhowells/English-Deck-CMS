import "./index.css";

export default function Sidebar() {
  return (
    <section className="sidebar">
      <div className="new-article">
        <h3 className="new-article-text">Create new article</h3>
        <button className="new-article-btn">+</button>
      </div>
    </section>
  );
}
