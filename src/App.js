import "./index.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

import React from "react";
import { db } from "./firebase-config";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function App() {
  const [allArticles, setAllArticles] = React.useState([]);

  React.useEffect(() => {
    console.log("USEEFFECT RAN");

    async function getAllArticles() {
      const q = query(collection(db, "articles"));
      const querySnapshot = await getDocs(q);
      console.log("QUERY SNAPSHOT", querySnapshot);
      querySnapshot.forEach((doc) => {
        setAllArticles((prevAllArticles) => [...prevAllArticles, doc.data()]);
        console.log("FIREBASE DATA", doc.data());
      });
    }

    getAllArticles();
  }, []);

  console.log("THIS IS ALL ARTICLES", allArticles);

  return (
    <div className="app">
      <Sidebar allArticles={allArticles} />
      <Main allArticles={allArticles} />
    </div>
  );
}

export default App;
