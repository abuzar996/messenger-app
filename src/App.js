import "./App.css";
import { useState } from "react";
import AppHeader from "./containers/AppHeader";
import ChatBox from "./containers/ChatBox";
import ChatList from "./containers/ChatList";

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
