import React, { useEffect, useState } from "react";
import "./homeLayout.styles.css";
import { Outlet } from "react-router-dom";
import ChatList from "../../ChatList";
import { useDimentions } from "../../../hooks/useDimentions";
import { useSelector } from "react-redux";
const HomeLayout = () => {
  const dimentions = useDimentions();
  const { chatsHidden } = useSelector((state) => state.appReducer);
  const [mobileSize, setMobileSize] = useState(false);
  useEffect(() => {
    if (dimentions.width <= 600) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
  }, [dimentions, mobileSize]);

  if (mobileSize) {
    return (
      <div className="home-layout-container">
        <div style={{ width: "100%" }}>
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="home-layout-container">
      {!chatsHidden && (
        <div style={{ width: "40%" }}>
          {" "}
          <ChatList />
        </div>
      )}
      <div style={chatsHidden ? { width: "100%" } : { width: "60%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
