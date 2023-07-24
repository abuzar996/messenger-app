import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./chatBox.styles.css";

import { chats, data } from "../../constants/data";
import ChatSpace from "./chatSpace";
import MessageOptionModal from "../../modals/MessageOptionsModal";
import ChatHeader from "../ChatHeader";
import InputMessage from "../../components/InputMessage";
import { useDimentions } from "../../hooks/useDimentions";

//import { io } from "socket.io-client";

//const socket = io("ws://localhost:3000");

const ChatBox = () => {
  const { id } = useParams();
  const windowSize = useDimentions();
  const [mobileSize, setMobileSize] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [usersData] = useState(data);
  const [messageData, setMessageData] = useState(null);
  const [messageReply, setMessageReply] = useState(false);
  const [replyData, setReplyData] = useState(null);
  const [senderHeight, setSenderHeight] = useState(null);
  const [marginBottom, setMarginBottom] = useState(senderHeight);
  const [chatData, setChatData] = useState([...chats]);
  const [newMessage, setNewMessage] = useState([]);
  const [optionsModal, setOptionModalOpen] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    if (searchValue) {
      let newData = chats.filter((data) => {
        return data.user1
          ? data.user1.includes(searchValue)
          : data.user2.includes(searchValue);
      });
      setChatData([...newData]);
    } else {
      setChatData([...chats]);
    }
  }, [searchValue]);
  useEffect(() => {
    if (windowSize.width <= 500) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
  }, [windowSize, mobileSize]);
  useEffect(() => {
    const user = usersData.find((user) => user.userId === +id);
    setUserInfo(user);
  }, [id, usersData]);
  useEffect(() => {
    setMarginBottom(senderHeight);
  }, [senderHeight]);
  // useEffect(() => {
  //   socket.on("connect", () => console.log(socket.id));
  // }, []);
  function onSendClick() {
    //socket.emit("send", "a message has been sent to You");
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
      <div
        className="chat-box-container"
        style={mobileSize ? { marginLeft: "0px" } : null}
      >
        {optionsModal && (
          <MessageOptionModal
            modalOpen={setOptionModalOpen}
            topVal={+localStorage.getItem("yAxis_message")}
            leftVal={+localStorage.getItem("xAxis_message")}
          />
        )}
        <ChatHeader
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchFocus={searchFocus}
          setSearchFocus={setSearchFocus}
          {...userInfo}
        />
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
            searchFocus={searchFocus}
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
