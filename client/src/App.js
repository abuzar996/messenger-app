import "./App.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import AppHeader from "./containers/AppHeader";
import Notification from "./components/Notifications/notificationContainer";
import HomeLayout from "./containers/Home/homeLayout";

function App() {
  //console.log(`${process.env.REACT_APP_URL}`);
  const darkmode = useSelector((state) => state.appReducer.darkmode);
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div
      className={
        darkmode === true
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
      <Notification />
    </div>
  );
}

export default App;
