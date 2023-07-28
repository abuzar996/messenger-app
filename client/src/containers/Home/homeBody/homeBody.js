import React, { useState, useEffect } from "react";
import "./homeBody.styles.css";

import logo from "../../../images/imges.svg";
import { useDispatch } from "react-redux";
import {
  openAddfriendsModal,
  openSendMessageModal,
} from "../../../redux/slices/appSettingSlice";
import { useSelector } from "react-redux";
import { useDimentions } from "../../../hooks/useDimentions";

const HomeBody = () => {
  const { darkmode } = useSelector((state) => state.appReducer);
  const windowSize = useDimentions();
  const [bodyHeight, setBodyHeight] = useState(null);

  useEffect(() => {
    let height1 = localStorage.getItem("homeHeaderHeight");
    let height2 = localStorage.getItem("MainHeader-height");
    setBodyHeight(+height1 + +height2);
  }, [windowSize]);
  const dispatch = useDispatch();
  return (
    <div
      className="home-body-container"
      style={{ height: `calc(100vh - ${bodyHeight})` }}
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
