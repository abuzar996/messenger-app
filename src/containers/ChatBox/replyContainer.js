import React from "react";
import "./chatBox.styles.css";
import ReplyIcon from "@mui/icons-material/Reply";
const ReplyContainer = ({ width, message, marginBottom }) => {
  return (
    <div
      className="chat-box-message-reply-container"
      style={{ width: width, bottom: marginBottom }}
    >
      <div className="chat-box-message-reply-inner-container">
        <div>
          <label className="chat-box-message-label">
            {message.user1 ? message.user1 : message.user2}
          </label>
        </div>
        <div>
          <ReplyIcon className="chat-box-message-icon" />
        </div>
      </div>
    </div>
  );
};

export default ReplyContainer;
