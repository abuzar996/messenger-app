import React, { useState, useEffect } from "react";
import "./homeBody.styles.css";

import logo from "../../../images/imges.svg";
import { useDispatch } from "react-redux";
import {
  openAddfriendsModal,
  openSendMessageModal,
} from "../../../redux/slices/appSettingSlice";
//import { setUserNull } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useDimentions } from "../../../hooks/useDimentions";

const HomeBody = () => {
  const { darkmode, chatsHidden } = useSelector((state) => state.appReducer);
  const windowSize = useDimentions();
  const [bodyHeight, setBodyHeight] = useState(null);

  useEffect(() => {
    let height1 = +localStorage.getItem("homeHeaderHeight");
    let height2 = +localStorage.getItem("MainHeader-height");
    let windowHeight = window.innerHeight;
    let val = height1 + height2 + 6.5;
    setBodyHeight(((windowHeight - val) / windowHeight) * 100);
  }, [windowSize]);
  const dispatch = useDispatch();
  return (
    <div
      className="home-body-container"
      style={
        chatsHidden
          ? { height: `${bodyHeight}vh`, marginLeft: "0px" }
          : { height: `${bodyHeight}vh` }
      }
    >
      <img
        src={logo}
        alt={"logo"}
        className={darkmode ? "logo-img-theme-dark" : "logo-img-theme-light"}
      />
      <label
        onClick={() => {
          dispatch(openSendMessageModal());
        }}
      >
        Start a new chat
      </label>
      <label
        onClick={() => {
          dispatch(openAddfriendsModal());
        }}
      >
        Search for new friends
      </label>
    </div>
  );
};

export default HomeBody;
