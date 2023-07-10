import React from "react";
import "./chatBox.styles.css";
const ReplyContainerMessage = ({ repliedMessage }) => {
  return (
    <div className="chat-message-reply-container-user1">
      <label className="custom-label-reply">{repliedMessage}</label>
    </div>
  );
};

export default ReplyContainerMessage;
