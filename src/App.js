import "./App.css";
import { useState } from "react";
//import Header from "./components/Header/header";
import Card from "./components/Card";
function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div
      className={
        darkMode === true
          ? "theme-dark custom-fonts App"
          : "theme-light custom-fonts App"
      }
    >
      <Card />
      <button
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        change theme
      </button>
    </div>
  );
}

export default App;
