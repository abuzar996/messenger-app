import { useEffect, useState } from "react";

import React from "react";
import Notification from "./notification";
import "./notification.styles.css";

import { useSelector } from "react-redux";

const NotificationContainer = () => {
  const notifications = useSelector((state) => state.notify.notification);
  console.log(notifications);
  const [notification, setNotification] = useState(notifications);
  useEffect(() => {
    setNotification(notifications);
  }, [notifications]);

  return (
    <>
      {notification &&
        notification.length > 0 &&
        notification.map((notification, index) => (
          <Notification
            key={index}
            type={notification.type}
            message={notification.message}
            timeOut={notification.timeOut}
          />
        ))}
    </>
  );
};

export default NotificationContainer;
