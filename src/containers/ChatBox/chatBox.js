import React, { useState } from "react";
import "./chatBox.styles.css";
import ChatHeader from "../ChatHeader";
import InputMessage from "../../components/InputMessage";
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
  function onSendClick() {
    if (newMessage) {
      setChatData((prevState) => {
        console.log(prevState);
        return [...prevState, { user1: [newMessage] }];
      });
      // console.log(chatData);
    }
  }
  function onInputChange(e) {
    setNewMessage(e.target.value);
  }
  return (
    <div className="chat-box-container">
      <ChatHeader />
      <div className="chat-space">
        {chatData
          ? chatData.map((chat) =>
              chat.user1
                ? chat.user1.map((message, i) => (
                    <div key={i} className="inner-container">
                      <label className="label1">{message}</label>
                    </div>
                  ))
                : chat.user2.map((message, i) => (
                    <div key={i} className="inner-container-user">
                      <label className="label2">{message}</label>
                    </div>
                  ))
            )
          : null}
      </div>
      <InputMessage onClick={onSendClick} onChange={onInputChange} />
    </div>
  );
};

export default ChatBox;
