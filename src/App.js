import "./App.css";
import { useState } from "react";
//import Search from "./components/Search";
//import Header from "./components/Header/header";
//import Card from "./components/Card";
import AppHeader from "./containers/AppHeader";
//import ListHeader from "./containers/ListHeader";
//import TopNav from "./containers/TopNav";
//import ChatList from "./containers/ChatList";
import InputMessage from "./components/InputMessage";
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
      {/* <div style={{ width: "40%" }}>
        <ChatList />
      </div> */}
      <InputMessage />
    </div>
  );
}

export default App;
