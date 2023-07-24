import "./App.css";
import { useSelector } from "react-redux";
import AppHeader from "./containers/AppHeader";
import Notification from "./components/Notifications/notificationContainer";
import { useDispatch } from "react-redux";
import {
  removeAllNotifications,
  addNotification,
} from "../src/redux/slices/notificationSlice";
//import { setIsMounted } from "../src/redux/slices/appSettingSlice";
import HomeLayout from "./containers/Home/homeLayout";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { darkmode, isMounted } = useSelector((state) => state.appReducer);

  useEffect(() => {
    //console.log(isMounted);
    dispatch(removeAllNotifications());

    dispatch(
      addNotification({
        message: "User Login Successfull",
        type: "Success",
        timeOut: 3000,
      })
    );
  }, [dispatch, isMounted]);
  return (
    <>
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
      </div>
      <Notification />
    </>
  );
}

export default App;
