import React from "react";
import { Outlet } from "react-router-dom";
import NotificationContainer from "../../components/Notifications/notificationContainer";
const Applayout = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
      <NotificationContainer />
    </>
  );
};

export default Applayout;
