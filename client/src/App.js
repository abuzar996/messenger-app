import "./App.css";
import { useSelector } from "react-redux";
import AppHeader from "./containers/AppHeader";
import Notification from "./components/Notifications/notificationContainer";
import { useDispatch } from "react-redux";
import Loader from "./components/Loader";
import { removeAllNotifications } from "../src/redux/slices/notificationSlice";

import HomeLayout from "./containers/Home/homeLayout";
import { useEffect } from "react";
import { getUser } from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { darkmode, isMounted } = useSelector((state) => state.appReducer);
  useEffect(() => {
    let email = localStorage.getItem("Email");
    dispatch(getUser(email));
  }, [dispatch]);
  useEffect(() => {
    dispatch(removeAllNotifications());
    // dispatch(
    //   addNotification({
    //     message: "User Login Successfull",
    //     type: "Success",
    //     timeOut: 3000,
    //   })
    // );
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
        {userData.loading && <Loader />}
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
