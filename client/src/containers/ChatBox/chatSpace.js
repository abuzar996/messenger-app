import React, { useEffect, useRef, useState } from "react";
import { useKeys } from "../../hooks/useKeys";
import { setHorizontalDisplay, setVerticalDisplay } from "./constantMethods";
import DeleteModal from "../../modals/DeleteModal/deleteModal";
import { useDimentions } from "../../hooks/useDimentions";
import ReplyContainer from "./replyContainer";
import "./chatBox.styles.css";
import { EmptyMessage } from "./emptyMessage";
import MessageOptionsModal from "../../modals/MessageOptionsModal";
import CircularProgress from "@mui/material/CircularProgress";
import Message from "./message";

const ChatSpace = ({
  marginBottom,
  messageReply,
  setMessageReply,
  searchFocus,
  dataToBePassed,
  setDataToBePassed,
  messageData,
  setMessageData,
  messagesLoading,
  messages,
}) => {
  const dimentions = useDimentions();
  const [documentWidth, setDocumentWidth] = useState(null);
  const [messagesData, setMessagesData] = useState([]);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const refferences = useRef(null);

  useKeys("Escape", toggleModal, refferences);

  function toggleModal() {
    if (messageReply) {
      setMessageReply(false);
      localStorage.removeItem("message");
      localStorage.removeItem("confirm-message");
    }
  }
  useEffect(() => {
    setDocumentWidth(refferences.current.clientWidth);
  }, [dimentions]);

  function onMessageClick(xValue, yValue, data) {
    const parentHeight = refferences.current.clientHeight;
    const parentWidth = refferences.current.clientWidth;
    const cHeight = +localStorage.getItem("height_message");
    const cWidth = +localStorage.getItem("width_message");
    setHorizontalDisplay(xValue, parentWidth, cWidth);
    setVerticalDisplay(yValue, parentHeight, cHeight);
    localStorage.setItem("message", JSON.stringify(data));
    setMessageData(data);
  }
  useEffect(() => {
    setMessagesData(messages);
  }, [messages]);
  useEffect(() => {
    refferences.current.scrollTo({
      top: refferences.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messagesData]);

  function onReplyClick() {
    setMessageReply(true);
    setDataToBePassed(messageData);
  }

  return (
    <div
      className={
        messagesData.length ? "chat-space" : "chat-space justify-element"
      }
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
      {messagesLoading ? (
        <div className="chat-space-loading-message">
          <CircularProgress color="success" />
        </div>
      ) : !messagesData.length ? (
        <EmptyMessage searchFocus={searchFocus} />
      ) : (
        <Message
          onClick={onMessageClick}
          messages={messagesData}
          setOptionModalOpen={setOptionModalOpen}
        />
      )}
      {messageReply && (
        <ReplyContainer
          width={documentWidth}
          marginBottom={marginBottom}
          data={dataToBePassed}
        />
      )}
    </div>
  );
};

export default ChatSpace;
