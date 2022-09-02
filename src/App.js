import "./index.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

import React from "react";
import { db } from "./firebase-config";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";

function App() {
  // will be set to the "articles" collection from Firebase - all articles
  const [allArticles, setAllArticles] = React.useState([]);
  // currentArticle when has a value, is an object. Set to empty sting as default because
  // needs to evaluate to false when empty.
  // Is the currently selected article from the sidebar
  const [currentArticle, setCurrentArticle] = React.useState("");

  // CAN SET THIS TO RUN EVERY TIME CURRENT ARTICLE CHANGES WHICH TRIGGERS
  // SIDEBAR UPDATE BUT IT SEEMS LIKE A BAD SOLUTION
  // gets articles collection from Firebase and sets it to allArticles
  // React.useEffect(() => {
  //   async function getAllArticles() {
  //     // clear articles array so that it doesn't double up if useEffect called again
  //     setAllArticles([]);

  //     const q = query(collection(db, "articles"));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       setAllArticles((prevAllArticles) => [...prevAllArticles, doc.data()]);
  //     });
  //   }

  //   getAllArticles();
  // }, []);

  // MOVED FROM SIDEBAR.JS.. HAD ONE SNAPSHOT THERE AND GETDOCS HERE IN SEPERATE
  // USEEFFECTS.. LEFT IN ABOVE CODE UNTIL SURE THIS CAUSES NO PROBLEMS
  // onSnapshot monitors changes in articles doc so when docs are added or deleted
  // it updates allArticles, which re-renders sidebar articles
  React.useEffect(() => {
    const q = query(collection(db, "articles"));
    onSnapshot(q, (snapshot) => {
      setAllArticles([]);
      const fetchedArticles = snapshot.docs.map((doc) => {
        return { ...doc.data() };
      });
      setAllArticles(fetchedArticles);
    });
  }, []);

  return (
    <div className="app">
      <Sidebar
        allArticles={allArticles}
        setAllArticles={setAllArticles}
        setCurrentArticle={setCurrentArticle}
        currentArticle={currentArticle}
      />
      <Main
        allArticles={allArticles}
        currentArticle={currentArticle}
        setCurrentArticle={setCurrentArticle}
      />
    </div>
  );
}

export default App;
