import "./App.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./containers/AppHeader";
//import { useNavigate } from "react-router-dom";
//import UserProfileModal from "./modals/UserProfileModal";
//import ChatBox from "./containers/ChatBox";
//import HomeLayout from "./containers/Home/homeLayout";
import ChatList from "./containers/ChatList";
//import SignIn from "./containers/SignIn";
//import SignUp from "./containers/SignUp";
//import DeleteMadal from "./modals/DeleteModal/deleteModal";
function App() {
  // const navigate = useNavigate();
  // const [modalOpen, setModalOpen] = useState(true);
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
}

export default App;
