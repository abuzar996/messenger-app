import React, { useEffect, useRef, useState } from "react";
import { useKeys } from "../../hooks/useKeys";

import DeleteModal from "../../modals/DeleteModal/deleteModal";
import { useDimentions } from "../../hooks/useDimentions";
import ReplyContainer from "./replyContainer";
import "./chatBox.styles.css";
import { EmptyMessage } from "./emptyMessage";
import MessageOptionsModal from "../../modals/MessageOptionsModal";
import Message from "./message";

const ChatSpace = ({ chatData, scrollValue, setScrollValue, marginBottom }) => {
  const dimentions = useDimentions();
  const [documentWidth, setDocumentWidth] = useState(null);
  const [messageReply, setMessageReply] = useState(true); //useContext(replyContext);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const refferences = useRef(null);

  useKeys("Escape", toggleModal);

  function toggleModal() {
    setMessageReply(false);
  }

  useEffect(() => {
    setDocumentWidth(refferences.current.clientWidth);
  }, [dimentions]);
  useEffect(() => {
    console.log(messageReply);
  }, [messageReply]);
  function setHorizontalDisplay(xValue, parentWidth, clientWidth) {
    // console.log(xValue, parentWidth, clientWidth);
    if (xValue + clientWidth > parentWidth) {
      localStorage.setItem("xAxis", xValue - 110 - clientWidth);
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

  function onMessageClick(xValue, yValue, data) {
    const parentHeight = refferences.current.clientHeight;
    const parentWidth = refferences.current.clientWidth;
    const cHeight = +localStorage.getItem("height_message");
    console.log(cHeight);

    const cWidth = +localStorage.getItem("width_message");
    console.log(cWidth);
    setHorizontalDisplay(xValue, parentWidth, cWidth);
    setVerticalDisplay(yValue, parentHeight, cHeight);
    // console.log(data);
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
  }, [chatData]);

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
          setMessageReply={setMessageReply}
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
            setOptionModalOpen={setOptionModalOpen}
          />
        ))
      )}
      {messageReply && (
        <ReplyContainer
          width={documentWidth}
          marginBottom={marginBottom}
          message={"hello world!"}
        />
      )}
    </div>
  );
};

export default ChatSpace;
