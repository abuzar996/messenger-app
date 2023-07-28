import React, { useEffect, useRef } from "react";
import { useDimentions } from "../../../hooks/useDimentions";
import "./homeHeader.styles.css";

const HomeHeader = () => {
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
    <div className="home-header-container" ref={homeHeaderRef}>
      <div>
        <label>Messenger Web Application</label>
      </div>
    </div>
  );
};
export default HomeHeader;
