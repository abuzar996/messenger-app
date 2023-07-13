import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./chatBox.styles.css";

import { chats, data } from "../../constants/data";
import ChatSpace from "./chatSpace";
import MessageOptionModal from "../../modals/MessageOptionsModal";
import ChatHeader from "../ChatHeader";
import InputMessage from "../../components/InputMessage";

const ChatBox = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [usersData] = useState(data);
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
    const user = usersData.find((user) => user.userId === +id);
    setUserInfo(user);
  }, [id, usersData]);
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
        <ChatHeader {...userInfo} />
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
