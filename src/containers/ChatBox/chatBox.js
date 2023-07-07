import React, { useState } from "react";
import "./chatBox.styles.css";
//import Message from "./message";
import { chats } from "../../constants/data";
//import { EmptyMessage } from "./noConversation";
import ChatSpace from "./chatSpace";
//import DeleteModal from "../../modals/DeleteModal/deleteModal";
import MessageOptionModal from "../../modals/MessageOptionsModal";
import ChatHeader from "../ChatHeader";
import InputMessage from "../../components/InputMessage";

const ChatBox = () => {
  const [chatData, setChatData] = useState(chats);
  const [newMessage, setNewMessage] = useState([]);
  const [optionsModal, setOptionModalOpen] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

  function onSendClick() {
    if (newMessage.length) {
      let temp = newMessage?.trim();
      if (temp.length) {
        setChatData((prevState) => {
          return [
            ...prevState,
            { user1: newMessage, messageId: prevState.length + 1 },
          ];
        });
      }
      setNewMessage("");
    }
  }
  function onInputChange(e) {
    setNewMessage(e.target.value);
  }

  return (
    <>
      {/* <DeleteModal headerMessage={"message Options"} /> */}
      <div className="chat-box-container">
        {optionsModal ? (
          <MessageOptionModal
            modalOpen={setOptionModalOpen}
            topVal={+localStorage.getItem("yAxis_message")}
            leftVal={+localStorage.getItem("xAxis_message")}
          />
        ) : null}
        <ChatHeader />
        <div>
          <ChatSpace
            chatData={chatData}
            scrollValue={scrollValue}
            setScrollValue={setScrollValue}
          />
        </div>
        <InputMessage
          value={newMessage}
          onClick={onSendClick}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};

export default ChatBox;
