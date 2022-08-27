import "./index.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

import React from "react";


function App() {

  
const [allArticles, setAllArticles] =  React.useState([])

  return (
    <div className="app">
      <Sidebar allArticles={allArticles}/>
      <Main setAllArticles={setAllArticles}/>
    </div>
  );
}

export default App;
