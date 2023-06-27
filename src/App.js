import "./App.css";
import { useEffect, useState } from "react";
//import Search from "./components/Search";
//import Header from "./components/Header/header";
//import Card from "./components/Card";
import AppHeader from "./containers/AppHeader";
import ChatHeader from "./containers/ChatHeader";
//import ListHeader from "./containers/ListHeader";
import ChatBox from "./containers/ChatBox";
//import TopNav from "./containers/TopNav";
import ChatList from "./containers/ChatList";
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
      <AppHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        id="app-header"
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "40%" }}>
          <ChatList />
        </div>
        <div style={{ width: "60%" }}>
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default App;
