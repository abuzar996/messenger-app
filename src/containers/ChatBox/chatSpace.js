import React, { useEffect, useRef, useState } from "react";
import DeleteModal from "../../modals/DeleteModal/deleteModal";
import "./chatBox.styles.css";
import { EmptyMessage } from "./emptyMessage";
import MessageOptionsModal from "../../modals/MessageOptionsModal";
import Message from "./message";
const ChatSpace = ({ chatData, scrollValue, setScrollValue }) => {
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const refferences = useRef(null);

  function setHorizontalDisplay(xValue, parentWidth, clientWidth) {
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

  function onMessageClick(xValue, yValue) {
    const parentHeight = refferences.current.clientHeight;
    const parentWidth = refferences.current.clientWidth;
    const cHeight = +localStorage.getItem("height_message");
    const cWidth = +localStorage.getItem("widht_message");
    setHorizontalDisplay(xValue, parentWidth, cWidth);
    setVerticalDisplay(yValue, parentHeight, cHeight);
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
      {confirmModal ? (
        <DeleteModal
          headerMessage={"Delete Message"}
          modalOpen={setConfirmModal}
        />
      ) : null}
      {optionModalOpen ? (
        <MessageOptionsModal
          deleteModal={setConfirmModal}
          topVal={+localStorage.getItem("yAxis")}
          leftVal={+localStorage.getItem("xAxis")}
          modalOpen={setOptionModalOpen}
        />
      ) : null}
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
    </div>
  );
};

export default ChatSpace;
