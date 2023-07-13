import React, { useEffect, useState } from "react";
import "./homeComponent.styles.css";
import HomeHeader from "../homeHeader";
import HomeBody from "../homeBody";
import { useDimentions } from "../../../hooks/useDimentions";
import ChatList from "../../ChatList";
const HomeComponent = () => {
  const [mobileSize, setMobileSize] = useState(false);

  const windowSize = useDimentions();
  useEffect(() => {
    if (windowSize.width <= 500) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
  }, [windowSize, mobileSize]);
  return (
    <div className="home-component-layout-container">
      {!mobileSize ? (
        <>
          <HomeHeader />
          <HomeBody />
        </>
      ) : (
        <ChatList />
      )}
    </div>
  );
};

export default HomeComponent;
