import React, { useEffect, useRef, useState } from "react";
import { useKeys } from "../../hooks/useKeys";

import DeleteModal from "../../modals/DeleteModal/deleteModal";
import { useDimentions } from "../../hooks/useDimentions";
import ReplyContainer from "./replyContainer";
import "./chatBox.styles.css";
import { EmptyMessage } from "./emptyMessage";
import MessageOptionsModal from "../../modals/MessageOptionsModal";
import Message from "./message";

const ChatSpace = ({
  chatData,
  scrollValue,
  setScrollValue,
  marginBottom,
  messageReply,
  setMessageReply,
  messageData,
  setMessageData,
  setReplyData,
}) => {
  const dimentions = useDimentions();
  const [documentWidth, setDocumentWidth] = useState(null);

  const [visual, setVisual] = useState(null);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const refferences = useRef(null);

  useKeys("Escape", toggleModal);

  function toggleModal() {
    setMessageReply(false);
    setMessageData(null);
  }

  useEffect(() => {
    setDocumentWidth(refferences.current.clientWidth);
  }, [dimentions]);

  function setHorizontalDisplay(xValue, parentWidth, clientWidth) {
    if (xValue + clientWidth > parentWidth) {
      localStorage.setItem("xAxis", xValue - clientWidth);
    } else {
      localStorage.setItem("xAxis", xValue - clientWidth);
    }
  }

  function setVerticalDisplay(yValue, parentHeight, clientHeight) {
    if (yValue + clientHeight - scrollValue > parentHeight) {
      localStorage.setItem("yAxis", yValue - clientHeight + 18 - scrollValue);
    } else {
      localStorage.setItem("yAxis", yValue - scrollValue);
    }
  }

  function onMessageClick(xValue, yValue, messageData) {
    const parentHeight = refferences.current.clientHeight;
    const parentWidth = refferences.current.clientWidth;
    const cHeight = +localStorage.getItem("height_message");
    const cWidth = +localStorage.getItem("width_message");
    setHorizontalDisplay(xValue, parentWidth, cWidth);
    setVerticalDisplay(yValue, parentHeight, cHeight);
    setMessageData(messageData);
  }

  useEffect(() => {
    const element = refferences.current;
    function scrollEvent() {
      setScrollValue(element.scrollTop);
    }
    element.addEventListener("scroll", scrollEvent);
    return () => element.removeEventListener("scroll", scrollEvent);
  }, [setScrollValue]);

  useEffect(() => {
    refferences.current.scrollTo({
      top: refferences.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatData, messageReply]);

  useEffect(() => {
    if (messageReply === true) {
      setReplyData(messageData);
    } else {
      setReplyData(null);
    }
  }, [messageReply, setReplyData, messageData]);
  function onReplyClick() {
    setMessageReply(true);
    setVisual(messageData);
  }

  return (
    <div
      className={chatData.length ? "chat-space" : "chat-space justify-element"}
      ref={refferences}
    >
      {confirmModal && (
        <DeleteModal
          headerMessage={"Delete Message"}
          modalOpen={setConfirmModal}
        />
      )}
      {optionModalOpen && (
        <MessageOptionsModal
          onReplyClick={onReplyClick}
          deleteModal={setConfirmModal}
          topVal={+localStorage.getItem("yAxis")}
          leftVal={+localStorage.getItem("xAxis")}
          modalOpen={setOptionModalOpen}
        />
      )}
      {!chatData.length ? (
        <EmptyMessage />
      ) : (
        chatData.map((chat, index) => (
          <Message
            onClick={onMessageClick}
            key={chat.messageId}
            message={chat}
            chatData={chatData}
            setOptionModalOpen={setOptionModalOpen}
          />
        ))
      )}
      {messageReply && (
        <ReplyContainer
          width={documentWidth}
          marginBottom={marginBottom}
          message={visual}
        />
      )}
    </div>
  );
};

export default ChatSpace;
