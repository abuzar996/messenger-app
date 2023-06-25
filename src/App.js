import "./App.css";
import { useState } from "react";
import Search from "./components/Search";
import Header from "./components/Header/header";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  function refresh() {
    setSearchValue("");
  }
  function onInputChange(e) {
    setSearchValue(e.target.value);
  }
  return (
    <div
      className={
        darkMode === true
          ? "theme-dark custom-fonts App"
          : "theme-light custom-fonts App"
      }
    >
      <Search
        onChange={onInputChange}
        key={"1"}
        searchValue={searchValue}
        refresh={refresh}
      />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
