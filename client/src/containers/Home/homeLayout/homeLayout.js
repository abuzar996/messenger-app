import React, { useEffect, useState } from "react";
import "./homeLayout.styles.css";
import { Outlet } from "react-router-dom";
import ChatList from "../../ChatList";
import { useDimentions } from "../../../hooks/useDimentions";

const HomeLayout = () => {
  const dimentions = useDimentions();
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
      <div style={{ width: "40%" }}>
        <ChatList />
      </div>
      <div style={{ width: "60%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
