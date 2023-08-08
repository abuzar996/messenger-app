import React from "react";
import "./notification.styles.css";
import Icon from "./iconChoose";
import CancelIcon from "@mui/icons-material/Cancel";
const NotificationMessage = ({ message, type, onHide }) => {
  return (
    <div className="notification-message-container">
      <div className="notification-message-header">
        <CancelIcon
          style={{ paddingLeft: "10px", color: "orange" }}
          onClick={onHide.bind(this)}
        />
        <label className="notification-message-header-label">{type}</label>
      </div>
      <div className="notification-message-body">
        <div className="notification-icon-div">
          <Icon type={type} />
        </div>
        <div>
          <label className="notification-body-label">{message}</label>
        </div>
      </div>
    </div>
  );
};

export default NotificationMessage;
