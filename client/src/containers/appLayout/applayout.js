import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import NotificationContainer from "../../components/Notifications/notificationContainer";

const Applayout = () => {
  console.log("Applayout");
  const [isServerReachable, setServerReachable] = useState(false);
  const [isOnline, setOnline] = useState(true);
  const checkServerStatus = async () => {
    await axios
      .get("http://localhost:3001")
      .then((response) => {
        if (response.status === 200) {
          setServerReachable(true);
        }
      })
      .catch(() => {
        setServerReachable(false);
      });
  };
  const handleOnlineState = () => {
    setOnline(true);
  };
  const handleOfflineState = () => {
    setOnline(false);
  };
  useEffect(() => {
    checkServerStatus();
  });
  useEffect(() => {
    window.addEventListener("online", handleOnlineState);
    window.addEventListener("offline", handleOfflineState);
    return () => {
      window.removeEventListener("online", handleOnlineState);
      window.removeEventListener("offline", handleOfflineState);
    };
  }, []);
  return (
    <>
      {isServerReachable && isOnline ? (
        <>
          <div>
            <Outlet />
          </div>
          <NotificationContainer />
        </>
      ) : (
        <div>Server is Not Reachable</div>
      )}
    </>
  );
};

export default Applayout;
