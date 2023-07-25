import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import NotificationContainer from "../../components/Notifications/notificationContainer";

const Applayout = () => {
  const [isServerReachable, setServerReachable] = useState(false);

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
  useEffect(() => {
    checkServerStatus();
  });

  return (
    <>
      {isServerReachable ? (
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
