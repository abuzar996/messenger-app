import React, { useState, useEffect } from "react";
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
  //const message = new Message
  const [messageData, setMessageData] = useState(null);
  const [messageReply, setMessageReply] = useState(false);
  const [replyData, setReplyData] = useState(null);
  const [senderHeight, setSenderHeight] = useState(null);
  const [marginBottom, setMarginBottom] = useState(senderHeight);
  const [chatData, setChatData] = useState(chats);
  const [newMessage, setNewMessage] = useState([]);
  const [optionsModal, setOptionModalOpen] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  useEffect(() => {
    setMarginBottom(senderHeight);
  }, [senderHeight]);
  function onSendClick() {
    if (newMessage.length) {
      let temp = newMessage?.trim();
      if (temp.length) {
        setChatData((prevState) => {
          return [
            ...prevState,
            {
              user1: newMessage,
              messageId: prevState.length + 1,
              reply: replyData ? replyData.messageId : null,
            },
          ];
        });
        setMessageData(null);
        setMessageReply(false);
      }
      setNewMessage("");
    }
  }
  function onInputChange(e) {
    setNewMessage(e.target.value);
  }

  return (
    <>
      <div className="chat-box-container">
        {optionsModal && (
          <MessageOptionModal
            modalOpen={setOptionModalOpen}
            topVal={+localStorage.getItem("yAxis_message")}
            leftVal={+localStorage.getItem("xAxis_message")}
          />
        )}
        <ChatHeader />
        <div>
          <ChatSpace
            replyData={replyData}
            setReplyData={setReplyData}
            messageData={messageData}
            setMessageData={setMessageData}
            messageReply={messageReply}
            setMessageReply={setMessageReply}
            marginBottom={marginBottom}
            chatData={chatData}
            scrollValue={scrollValue}
            setScrollValue={setScrollValue}
          />
        </div>
        <InputMessage
          messageReply={messageReply}
          setMessageReply={setMessageReply}
          setSenderHeight={setSenderHeight}
          value={newMessage}
          onClick={onSendClick}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};

export default ChatBox;
