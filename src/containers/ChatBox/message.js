import React, { useEffect, useRef, useState } from "react";
import ReplyContainerMessage from "./replyContainerMessage";
import "./chatBox.styles.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const SimpleMessage = ({
  message,
  messageRef,
  onHandleClick,
  repliedMessage,
}) => {
  return (
    <div className={message.user1 ? "inner-container-user" : "inner-container"}>
      <div
        style={
          repliedMessage
            ? {
                display: "flex",
                flexDirection: "column",
                backgroundColor: message.reply
                  ? message.user1
                    ? "gray"
                    : "gray"
                  : null,
                borderRadius: "19px",
                border: "1px solid black",
              }
            : {
                display: "flex",
              }
        }
      >
        {repliedMessage && (
          <ReplyContainerMessage
            repliedMessage={
              repliedMessage.user1 ? repliedMessage.user1 : repliedMessage.user2
            }
          />
        )}
        <label className={message.user1 ? "label2" : "label1"}>
          {message.user1 ? message.user1 : message.user2}
        </label>
      </div>
      <div
        style={{
          paddingBottom: "15px",
          alignItems: "center",
          justifyContent: "center",
        }}
        ref={messageRef}
      >
        <MoreHorizIcon
          className="icon-visibility"
          onClick={() => onHandleClick(message)}
        />
      </div>
    </div>
  );
};
const Message = ({ message, onClick, setOptionModalOpen, chatData }) => {
  const [repliedMessage, setRepliedMessage] = useState(null);
  useEffect(() => {
    function filterMessage(message) {
      const replyToMess = chatData.filter(
        (chat) => message.reply === chat.messageId
      );
      return JSON.stringify(replyToMess[0]);
    }
    if (message.reply) {
      setRepliedMessage(JSON.parse(filterMessage(message)));
    }
  }, [message, chatData]);
  const messageRef = useRef(null);
  function onHandleClick(index) {
    if (onClick) {
      onClick(
        messageRef.current.offsetLeft,
        messageRef.current.offsetTop,
        index
      );
      setOptionModalOpen(true);
    }
  }

  return (
    <>
      <SimpleMessage
        repliedMessage={repliedMessage}
        message={message}
        messageRef={messageRef}
        onHandleClick={onHandleClick}
      />
    </>
  );
};

export default Message;
