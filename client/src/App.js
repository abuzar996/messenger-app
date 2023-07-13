import "./App.css";
import { useState } from "react";
import AppHeader from "./containers/AppHeader";

import HomeLayout from "./containers/Home/homeLayout";
function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div
      className={
        darkMode === true
          ? "theme-dark custom-fonts App uniform-colors"
          : "theme-light custom-fonts App uniform-colors"
      }
    >
      <AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="fixed-app-layout">
        <div className="home-layout">
          <HomeLayout />
        </div>
      </div>
    </div>
  );
}

export default App;
