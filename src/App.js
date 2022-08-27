import "./index.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

import React from "react";
import { db } from "./firebase-config";
import { collection, query, getDocs } from "firebase/firestore";

function App() {
  const [allArticles, setAllArticles] = React.useState([]);
  // this is an object when has a value, set to empty sting as default because
  // empty object evaluates to true
  const [currentArticle, setCurrentArticle] = React.useState("");

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

  // console.log("CURRENT ARTICLE", currentArticle.meta.title);

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
