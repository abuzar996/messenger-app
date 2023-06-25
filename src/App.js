import "./App.css";
import { useState } from "react";
import Search from "./components/Search";
import Header from "./components/Header/header";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  function onInputChange(e) {
    //console.log(e.target.value);
  }
  return (
    <div
      className={
        darkMode === true
          ? "theme-dark custom-fonts App"
          : "theme-light custom-fonts App"
      }
    >
      <Search onChange={onInputChange} key={"1"} />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
