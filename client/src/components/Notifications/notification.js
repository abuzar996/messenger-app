import React, { useEffect, useState } from "react";
import "./notification.styles.css";
import "../../App.css";

import NotificationMessage from "./notificationMessage";
//import { useDispatch } from "react-redux";
//import { removeNotification } from "../../redux/slices/notificationSlice.js";

const Notification = ({ type, message, timeOut }) => {
  //  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  function onHide() {
    setIsVisible(false);
  }
  useEffect(() => {
    var timer;
    if (timeOut) {
      timer = setTimeout(() => {
        setIsVisible(false);
      }, timeOut);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [timeOut]);
  let className =
    type === "Success"
      ? "notification-border-green"
      : "notification-border-red";
  return (
    <>
      {!isVisible ? null : (
        <div className={`theme-dark App notification-display ${className}`}>
          <div className="notification-header">
            <NotificationMessage
              type={type}
              message={message}
              onHide={onHide}
            />
          </div>
        </div>
      )}
      {isVisible && <br />}
      {isVisible && <br />}
      {isVisible && <br />}
      {isVisible && <br />}
      {isVisible && <br />}
    </>
  );
};

export default Notification;
