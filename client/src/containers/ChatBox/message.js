import React, { useEffect, useState } from "react";
import "./chatBox.styles.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const useReplies = (message, messageList) => {
  const [replyTo, setReplyTo] = useState(null);
  const [toBeRepliedExists, setToBeRepliedExists] = useState(false);
  useEffect(() => {
    if (message.reply) {
      if (messageList.length > 0) {
        let messageToBeReplied = messageList.find(
          (list) => list.messageId === message.reply
        );
        if (messageToBeReplied) {
          setReplyTo(messageToBeReplied.message);
          setToBeRepliedExists(true);
        } else {
          setReplyTo(null);
          setToBeRepliedExists(false);
        }
      } else {
        setReplyTo(null);
      }
    }
  }, [message, messageList]);
  return { reply: toBeRepliedExists, messageToBeReplied: replyTo };
};

const MessageModalOptions = ({ onHandleClick, message }) => {
  return (
    <div id={message.messageId}>
      <MoreHorizIcon
        className="icon-visibility"
        onClick={() => onHandleClick(message)}
      />
    </div>
  );
};

const MessageSent = ({ messages, messageRef, onHandleClick, messageList }) => {
  //  useReplies(messages, messageList);
  const { reply, messageToBeReplied } = useReplies(messages, messageList);
  return (
    <>
      {reply && messageToBeReplied ? (
        <div
          style={{ padding: "10px", flexDirection: "column", float: "right" }}
        >
          <div
            style={{
              backgroundColor: "gray",
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
            }}
          >
            <label
              className="custom-label-reply"
              style={{
                paddingTop: "10px",
                paddingLeft: "10px",
                textAlign: "center",
              }}
            >
              {messageToBeReplied}
            </label>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div className="inner-container-user" ref={messageRef}>
                <label className="label2">{messages.message}</label>
                <MessageModalOptions
                  message={messages}
                  messageRef={messageRef}
                  onHandleClick={onHandleClick}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="inner-container-user" ref={messageRef}>
          <label className="label2">{messages.message}</label>
          <MessageModalOptions
            message={messages}
            messageRef={messageRef}
            onHandleClick={onHandleClick}
          />
        </div>
      )}
    </>
  );
};

const MessageRecieved = ({ messages, onHandleClick, messageList }) => {
  const { reply, messageToBeReplied } = useReplies(messages, messageList);

  return (
    <>
      {reply && messageToBeReplied ? (
        <div
          style={{ padding: "10px", flexDirection: "column", float: "left" }}
        >
          <div
            style={{
              backgroundColor: "gray",
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
            }}
          >
            <label
              className="custom-label-reply"
              style={{
                paddingTop: "10px",
                paddingLeft: "10px",
                textAlign: "center",
              }}
            >
              {messageToBeReplied}
            </label>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <div className="inner-container">
                <label className="label1">{messages.message}</label>

                <MessageModalOptions
                  message={messages}
                  onHandleClick={onHandleClick}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="inner-container">
          <label className="label1">{messages.message}</label>
          <MessageModalOptions
            message={messages}
            onHandleClick={onHandleClick}
          />
        </div>
      )}
    </>
  );

  // return toBeViewed;
};

const Message = ({ onClick, setOptionModalOpen, messages }) => {
  const { user } = useSelector((state) => state.user);

  function onHandleClick(index) {
    let element = document.getElementById(index.messageId);
    if (onClick) {
      onClick(
        element.getBoundingClientRect().x,
        element.getBoundingClientRect().y,
        index
      );
      setOptionModalOpen(true);
    }
  }

  return (
    <>
      {messages.length > 0 &&
        messages.map((message) => (
          <div key={message.messageId}>
            {message.sender === user.firstname ? (
              <MessageSent
                id={message.messageId}
                messages={message}
                messageList={messages}
                onHandleClick={() => onHandleClick(message)}
              />
            ) : (
              <MessageRecieved
                id={message.messageId}
                messages={message}
                messageList={messages}
                onHandleClick={() => onHandleClick(message)}
              />
            )}
            ;
          </div>
        ))}
    </>
  );
};

export default Message;
