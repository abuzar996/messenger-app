import { useEffect, useState } from "react";

import React from "react";
import Notification from "./notification";
import "./notification.styles.css";

import { useSelector } from "react-redux";

const NotificationContainer = () => {
  const notifications = useSelector((state) => state.notify.notification);
  const [notification, setNotification] = useState(notifications);
  useEffect(() => {
    setNotification(notifications);
  }, [notifications]);

  return (
    <React.Fragment>
      {notification &&
        notification.length > 0 &&
        notification.map((notification, index) => (
          <Notification key={index} {...notification} />
        ))}
    </React.Fragment>
  );
};

export default NotificationContainer;
