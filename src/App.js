import "./App.css";
import { useState } from "react";
import AppHeader from "./containers/AppHeader";
import UserProfileModal from "./modals/UserProfileModal";
//import ChatBox from "./containers/ChatBox";
import HomeLayout from "./containers/Home/homeLayout";
import ChatList from "./containers/ChatList";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div
      className={
        darkMode === true
          ? "theme-dark custom-fonts App uniform-colors"
          : "theme-light custom-fonts App uniform-colors"
      }
    >
      <AppHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        id="app-header"
      />
      <UserProfileModal />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "40%" }}>
          <ChatList />
        </div>
        <div style={{ width: "60%" }}>
          <HomeLayout />
        </div>
      </div>
    </div>
  );
}

export default App;
