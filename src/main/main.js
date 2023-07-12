import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./containers/AppHeader";

import ChatList from "./containers/ChatList";

const Main = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      <AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "40%" }}>
          <ChatList />
        </div>
        <div style={{ width: "60%" }}>
          <Outlet redirect to="home" />
        </div>
      </div>
    </div>
  );
};

export default Main;
