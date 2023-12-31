import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ServerError from "../ServerError";
import NotificationContainer from "../../components/Notifications/notificationContainer";
import useStatus from "../../hooks/useStatus";
//

const Applayout = () => {
  //

  const isServerReachable = useStatus();
  const [isOnline, setOnline] = useState(true);

  // socket.on("connection", console.log("hello world"));
  // socket.on("send", () => console.log("hello from send"));

  // socket.on("hello", (arg, callback) => {
  //   console.log(arg); // "world"
  //   alert("hello world");
  //   callback("got it");
  // });

  const handleOnlineState = () => {
    setOnline(true);
  };
  const handleOfflineState = () => {
    setOnline(false);
  };
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
        <ServerError />
      )}
    </>
  );
};

export default Applayout;
