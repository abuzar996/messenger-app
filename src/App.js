import "./App.css";
import { useState } from "react";
//import Search from "./components/Search";
//import Header from "./components/Header/header";
import AppHeader from "./containers/AppHeader";
function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={
        darkMode === true
          ? "theme-dark custom-fonts App"
          : "theme-light custom-fonts App"
      }
    >
      <AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
