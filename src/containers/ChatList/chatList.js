import React, { useRef, useState, useEffect } from "react";
import "./chatList.styles.css";

import { data } from "../../constants/data";
import TopNav from "../TopNav";
import ListHeader from "../ListHeader";
import DeleteModal from "../../modals/DeleteModal/deleteModal";
import ChatOptionModal from "../../modals/ChatOptionsModal";
import ListData from "./listData";
import { useDimentions } from "../../hooks/useDimentions";

const ChatList = () => {
  const windowSize = useDimentions();
  const refference = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalXPosition, setModalXPosition] = useState(null);
  const [modalYPosition, setModalYPosition] = useState(null);

  function setValues(yValue) {
    let cHeight = +localStorage.getItem("height");
    let cWidth = +localStorage.getItem("width");
    let offsetLeft = +localStorage.getItem("chat_options_offsetx");
    let offsetTop = +localStorage.getItem("chat_options_offsety");
    if (cHeight && cWidth) {
      setModalXPosition(offsetLeft - cWidth + 18);
      //localStorage.setItem("xAxis", xOffset - cWidth + 18);
      if (cHeight) {
        if (yValue + cHeight - scrollValue > refference.current.clientHeight) {
          localStorage.setItem("yAxis", yValue - cHeight + 18 - scrollValue);
        } else {
          localStorage.setItem("yAxis", yValue - scrollValue);
        }
      }
    }
  }
  useEffect(() => {
    let cHeight = +localStorage.getItem("height");
    let cWidth = +localStorage.getItem("width");
    let offsetLeft = +localStorage.getItem("chat_options_offsetx");
    let offsetTop = +localStorage.getItem("chat_options_offsety");
    let parentHeight = refference.current.clientHeight;
    setModalXPosition(offsetLeft - cWidth + 18);
    if (offsetTop + cHeight - scrollValue > parentHeight) {
      setModalYPosition(offsetTop - cHeight + 18 - scrollValue);
    } else {
      setModalYPosition(offsetTop - cHeight - scrollValue);
    }
  }, [modalXPosition, modalYPosition, scrollValue, windowSize]);
  function onClick(event, yValue) {
    if (yValue) {
      setValues(yValue);
    }
  }

  return (
    <div ref={refference} className="chat-list-container">
      {confirmModal ? (
        <DeleteModal
          headerMessage={"Delete Conversation"}
          modalOpen={setConfirmModal}
        />
      ) : null}
      {optionModalOpen ? (
        <ChatOptionModal
          deleteModal={setConfirmModal}
          topVal={modalYPosition}
          leftVal={modalXPosition}
          modalOpen={setOptionModalOpen}
        />
      ) : null}
      <TopNav />
      <ListHeader />
      <ListData
        setScrollValue={setScrollValue}
        data={data}
        onClick={onClick}
        setOptionModalOpen={setOptionModalOpen}
      />
    </div>
  );
};

export default ChatList;
