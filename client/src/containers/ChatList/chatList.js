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
  const [mobileSize, setMobileSize] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalXPosition, setModalXPosition] = useState(null);
  const [modalYPosition, setModalYPosition] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [userData, setUserData] = useState([...data]);

  useEffect(() => {
    if (searchValue) {
      let tempUserData = data.filter((user) =>
        user.firstname.includes(searchValue)
      );

      setUserData([...tempUserData]);
    } else {
      setUserData([...data]);
    }
  }, [searchValue]);

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
      setModalYPosition(offsetTop - scrollValue);
    }
  }, [scrollValue, windowSize, optionModalOpen]);

  useEffect(() => {
    if (windowSize.width <= 600) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
  }, [windowSize, mobileSize]);

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
      <ListHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchFocus={searchFocus}
        setSearchFocus={setSearchFocus}
      />
      <ListData
        mobileSize={mobileSize}
        setScrollValue={setScrollValue}
        data={userData}
        searchFocus={searchFocus}
        setOptionModalOpen={setOptionModalOpen}
      />
    </div>
  );
};

export default ChatList;
