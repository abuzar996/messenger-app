import React, { useEffect, useState } from "react";
import "./notification.styles.css";
import "../../App.css";

import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";

const Notification = ({ type, message, timeOut }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer;
    if (timeOut) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, timeOut);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeOut]);
  return (
    <>
      {!isVisible ? null : (
        <div className="theme-dark App notification-display">
          <div className="notification-header">
            <div>
              {type === "success" ? (
                <DoneSharpIcon style={{ color: "green" }} />
              ) : (
                <ClearSharpIcon style={{ color: "red" }} />
              )}
            </div>
            <div>
              {" "}
              <label>{message}</label>
            </div>
          </div>
        </div>
      )}
      {isVisible && <br />}
      {isVisible && <br />}
      {isVisible && <br />}
      {isVisible && <br />}
    </>
  );
};

export default Notification;
