import React from "react";
import "./chatBox.styles.css";
import ReplyIcon from "@mui/icons-material/Reply";
const ReplyContainer = ({ width, marginBottom, data }) => {
  return (
    <div
      className="chat-box-message-reply-container"
      style={{ width: width, bottom: marginBottom }}
    >
      <div className="chat-box-message-reply-inner-container">
        <div>
          <label className="chat-box-message-label">{data.message}</label>
        </div>
        <div>
          <ReplyIcon className="chat-box-message-icon" />
        </div>
      </div>
    </div>
  );
};

export default ReplyContainer;
