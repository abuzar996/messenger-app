import React, { useEffect, useRef } from "react";
import { useDimentions } from "../../../hooks/useDimentions";
import "./homeHeader.styles.css";
import { useSelector } from "react-redux";
const HomeHeader = () => {
  const { chatsHidden } = useSelector((state) => state.appReducer);
  const homeHeaderRef = useRef();
  const windowSize = useDimentions();
  useEffect(() => {
    if (homeHeaderRef) {
      localStorage.setItem(
        "homeHeaderHeight",
        homeHeaderRef.current.clientHeight
      );
    }
  }, [windowSize]);
  return (
    <div
      className="home-header-container"
      style={chatsHidden ? { marginLeft: "0px" } : null}
      ref={homeHeaderRef}
    >
      <div>
        <label>Messenger Web Application</label>
      </div>
    </div>
  );
};
export default HomeHeader;
