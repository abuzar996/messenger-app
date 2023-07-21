import { useEffect, useState } from "react";

import React from "react";
import Notification from "./notification";
import "./notification.styles.css";
import Notify from "./notificationManager";
import { useSelector } from "react-redux";
//const workerThread = Worker("./worker.js");
const NotificationContainer = () => {
  //const worker = new Worker("./worker.js");
  const data = useSelector((state) => state.appReducer.notifyCount);

  const [notification, setNotification] = useState(null);
  function setNotifyData(notification) {
    setNotification(notification);
  }
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    Notify.addChangeListener(setNotifyData);

    return () => {
      Notify.removeChangeListener(setNotifyData);
    };
  }, []);

  return (
    <>
      {notification &&
        notification.length > 0 &&
        notification.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            timeOut={notification.timeOut}
          />
        ))}
    </>
  );
};

export default NotificationContainer;
