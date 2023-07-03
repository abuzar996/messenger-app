import React from "react";
import "./homeLayout.styles.css";
import HomeHeader from "../homeHeader";
import HomeBody from "../homeBody";
const HomeLayout = () => {
  return (
    <div className="home-layout-container">
      <HomeHeader />
      <HomeBody />
    </div>
  );
};

export default HomeLayout;
