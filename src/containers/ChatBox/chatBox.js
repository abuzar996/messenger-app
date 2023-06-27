import React from "react";
import "./chatBox.styles.css";
import ChatHeader from "../ChatHeader";
import InputMessage from "../../components/InputMessage";
const ChatBox = () => {
  return (
    <div className="chat-box-container">
      <ChatHeader />
      <div className="chat-space"></div>
      <InputMessage />
    </div>
  );
};

export default ChatBox;
