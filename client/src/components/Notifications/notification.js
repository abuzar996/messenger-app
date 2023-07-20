import React, { useState, useEffect } from "react";

import "./notification.styles.css";

import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
const Notification = ({ status, message }) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isVisible]);
  return (
    <>
      {isVisible && (
        <div className="notification-container">
          <div className="notification-header">
            <div>
              {status === true ? (
                <DoneSharpIcon style={{ color: "green" }} />
              ) : (
                <ClearSharpIcon style={{ color: "red" }} />
              )}
            </div>
            <div>
              <label>{message}</label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
