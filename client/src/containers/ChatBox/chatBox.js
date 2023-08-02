import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./chatBox.styles.css";
import { io } from "socket.io-client";
import { API } from "../../constants/data";
import ChatSpace from "./chatSpace";
import MessageOptionModal from "../../modals/MessageOptionsModal";
import ChatHeader from "../ChatHeader";
import InputMessage from "../../components/InputMessage";
import { useDimentions } from "../../hooks/useDimentions";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/slices/userSlice";
import { fetchAllMessages } from "../../redux/slices/chatSlice";
let socket; // =
const ChatBox = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { chatsHidden } = useSelector((state) => state.appReducer);
  const { user } = useSelector((state) => state.user);
  const windowSize = useDimentions();
  const [mobileSize, setMobileSize] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [messageReply, setMessageReply] = useState(false);
  const [senderHeight, setSenderHeight] = useState(null);
  const [marginBottom, setMarginBottom] = useState(senderHeight);
  const [newMessage, setNewMessage] = useState([]);
  const [optionsModal, setOptionModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllMessages(id));
  }, [dispatch, id]);
  useEffect(() => {
    socket = io(API);
    socket.emit("setup", user);
  }, [user]);

  useEffect(() => {
    socket.emit("join chat", id + "chatroom");
  }, [id]);
  function sendChat() {
    socket.emit("chat", "hello world");
  }

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (windowSize.width <= 500) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
  }, [windowSize, mobileSize]);

  useEffect(() => {
    setMarginBottom(senderHeight);
  }, [senderHeight]);

  function onSendClick() {
    // if (newMessage.length) {
    //   sendChat();
    //   let temp = newMessage?.trim();
    //   if (temp.length) {
    //     setChatData((prevState) => {
    //       return [
    //         ...prevState,
    //         {
    //           user1: newMessage,
    //           messageId: prevState.length + 1,
    //           reply: replyData ? replyData.messageId : null,
    //         },
    //       ];
    //     });
    //     setMessageData(null);
    //     setMessageReply(false);
    //   }
    //   setNewMessage("");
    // }
  }
  function onInputChange(e) {
    setNewMessage(e.target.value);
  }

  return (
    <>
      <div
        className="chat-box-container"
        style={
          mobileSize
            ? { marginLeft: "0px" }
            : chatsHidden
            ? { marginLeft: "0px" }
            : null
        }
      >
        {optionsModal && (
          <MessageOptionModal
            modalOpen={setOptionModalOpen}
            topVal={+localStorage.getItem("yAxis_message")}
            leftVal={+localStorage.getItem("xAxis_message")}
          />
        )}
        <ChatHeader
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchFocus={searchFocus}
          setSearchFocus={setSearchFocus}
        />
        <div>
          <ChatSpace
            messageReply={messageReply}
            setMessageReply={setMessageReply}
            marginBottom={marginBottom}
            searchFocus={searchFocus}
          />
        </div>
        <InputMessage
          sendChat={sendChat}
          messageReply={messageReply}
          setMessageReply={setMessageReply}
          setSenderHeight={setSenderHeight}
          value={newMessage}
          onClick={onSendClick}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};

export default ChatBox;
