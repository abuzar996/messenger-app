import "./App.css";
import { useSelector } from "react-redux";
import AppHeader from "./containers/AppHeader";
import Notification from "./components/Notifications/notificationContainer";

import HomeLayout from "./containers/Home/homeLayout";

function App() {
  const darkmode = useSelector((state) => state.appReducer.darkmode);

  return (
    <div
      className={
        darkmode === true
          ? "theme-dark custom-fonts App uniform-colors"
          : "theme-light custom-fonts App uniform-colors"
      }
    >
      <AppHeader />
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
