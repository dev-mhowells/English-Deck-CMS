import "./index.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

import React from "react";
import { db } from "./firebase-config";
import { collection, query, getDocs } from "firebase/firestore";

function App() {
  // will be set to the "articles" collection from Firebase - all articles
  const [allArticles, setAllArticles] = React.useState([]);
  // currentArticle when has a value, is an object. Set to empty sting as default because
  // needs to evaluate to false when empty.
  // Is the currently selected article from the sidebar
  const [currentArticle, setCurrentArticle] = React.useState("");

  // gets articles collection from Firebase and sets it to allArticles
  React.useEffect(() => {
    async function getAllArticles() {
      // clear articles array so that it doesn't double up if useEffect called again
      setAllArticles([]);

      const q = query(collection(db, "articles"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setAllArticles((prevAllArticles) => [...prevAllArticles, doc.data()]);
      });
    }

    getAllArticles();
  }, []);

  return (
    <div className="app">
      <Sidebar
        allArticles={allArticles}
        setCurrentArticle={setCurrentArticle}
      />
      <Main allArticles={allArticles} currentArticle={currentArticle} />
    </div>
  );
}

export default App;
