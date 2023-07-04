import React, { useState, useRef, useEffect } from "react";
import "./chatBox.styles.css";

import ChatHeader from "../ChatHeader";
import InputMessage from "../../components/InputMessage";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const chats = [
  {
    user1: ["hello", "how are you"],
  },
  {
    user2: ["hello", "I'm good", "how are you"],
  },
  {
    user1: ["Great!", "Thankyou!"],
  },
  {
    user1: ["hello", "how are you"],
  },
  {
    user2: [
      "hello",
      "I'm good",
      "how are you",
      "I'm good mdkdmkedk kemdkelndje kemdkedm kemdkqdn enjehdujebhdfbdhbhhe hehehhejwbdhjewlfnjrfn jendfjenfc jenwdjkedn  jwlqndjeklanlkend a quick brown fox jumps over the lazy dog",
    ],
  },
  {
    user1: ["Great!", "Thankyou!"],
  },
];

const ChatBox = () => {
  const [chatData, setChatData] = useState(chats);
  const [newMessage, setNewMessage] = useState([]);
  const refferences = useRef(null);
  function onSendClick() {
    if (newMessage.length) {
      let temp = newMessage?.trim();
      if (temp.length) {
        setChatData((prevState) => {
          return [...prevState, { user1: [newMessage] }];
        });
      }
      setNewMessage("");
    }
  }
  function onInputChange(e) {
    setNewMessage(e.target.value);
  }
  useEffect(() => {
    refferences.current.scrollTo({
      top: refferences.current.scrollHeight,
      behavior: "smooth",
    });
  });

  return (
    <div className="chat-box-container">
      <ChatHeader />
      <div className="chat-space" ref={refferences}>
        {chatData
          ? chatData.map((chat) =>
              chat.user1
                ? chat.user1.map((message, i) => (
                    <div key={i} className="inner-container-user">
                      <label className="label2">{message}</label>
                      <MoreHorizIcon className="icon-visibility" />
                    </div>
                  ))
                : chat.user2.map((message, i) => (
                    <div key={i} className="inner-container">
                      <label className="label1">{message}</label>
                      <MoreHorizIcon className="icon-visibility" />
                    </div>
                  ))
            )
          : null}
      </div>
      <InputMessage
        value={newMessage}
        onClick={onSendClick}
        onChange={onInputChange}
      />
    </div>
  );
};

export default ChatBox;
