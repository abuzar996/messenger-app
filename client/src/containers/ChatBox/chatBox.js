import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./chatBox.styles.css";
import { socket } from "../AppHeader/appHeader";
//import { io } from "socket.io-client";
//import { API } from "../../constants/data";
import ChatSpace from "./chatSpace";
import MessageOptionModal from "../../modals/MessageOptionsModal";
import ChatHeader from "../ChatHeader";
import InputMessage from "../../components/InputMessage";
import { useDimentions } from "../../hooks/useDimentions";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/slices/userSlice";
import { createUUID } from "../../constants/data";
//import { deleteChatRecord } from "../../redux/slices/chatSlice";
import {
  fetchAllMessages,
  addNewMessage,
  addNewMessageRecord,
  addNewChatList,
  updateTriggers,
  changeLength,
} from "../../redux/slices/chatSlice";
//let socket; // =
const ChatBox = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { chatsHidden } = useSelector((state) => state.appReducer);
  const {
    messages,
    messagesLoading,
    messageRecordId,
    addNewMessageRecordValue,
    //  addMessageLoading,
    //deleteRecordLoading,
    socketMessage,
    deleteLoading,
  } = useSelector((state) => state.chats);
  //  console.log(socket);
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
  const [dataToBePassed, setDataToBePassed] = useState({});
  const [messageData, setMessageData] = useState({});
  const [privateMessages, setPrivateMessages] = useState([]);
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    if (addNewMessageRecordValue !== -1) {
      dispatch(
        addNewChatList({
          message: addNewMessageRecordValue,
          userId: user.userId,
          clientId: +id,
        })
      );
      dispatch(updateTriggers());
    }
  }, [addNewMessageRecordValue, id, user, dispatch]);
  useEffect(() => {
    setPrivateMessages(messages);
  }, [messages]);
  useEffect(() => {
    if (!deleteLoading) {
      dispatch(fetchAllMessages(id));
    }
  }, [dispatch, id, deleteLoading]);
  useEffect(() => {
    if (socketMessage !== {}) {
      setPrivateMessages((prevState) => [...prevState, socketMessage]);
    }
  }, [socketMessage]);
  // useEffect(() => {
  //   socket = io(API);
  //   socket.emit("setup", user);
  // }, [user]);

  // useEffect(() => {
  //   socket.emit("join chat", +id);
  // }, [id]);

  // useEffect(() => {
  //   socket.on("message recieved", (data) => {
  //     if (data.sentTo === user.userId && data.userId === +id) {
  //       let newData = {
  //         messageId: data.messageId,
  //         sender: data.sender,
  //         message: data.message,
  //         reply: data.reply,
  //       };
  //       setPrivateMessages((prevState) => [...prevState, newData]);
  //     } else {
  //       console.log("hello I've A new message for you!");
  //     }
  //   });
  // }, [id, user]);

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
    setMarginBottom(senderHeight + 8);
  }, [senderHeight]);

  useEffect(() => {
    if (searchValue) {
      let tempUserData = privateMessages.filter((message) =>
        message.message.includes(searchValue)
      );
      if (searchData.length !== tempUserData.length) {
        setSearchData([...tempUserData]);
      }
    }
  }, [searchValue, searchFocus, searchData, privateMessages]);

  useEffect(() => {
    dispatch(changeLength(privateMessages.length));
  }, [privateMessages, dispatch]);

  function onSendClick() {
    if (newMessage.length > 0) {
      let randInt = createUUID();
      let replyExists = messageReply && dataToBePassed;
      let newMessageObject = {
        messageId: randInt,
        message: newMessage,
        sender: user.firstname,
        reply: replyExists ? dataToBePassed.messageId : -1,
      };
      if (newMessageObject) {
        let dataToSentOnSocket = {
          ...newMessageObject,
          userId: user.userId,
          sentTo: +id,
        };
        socket.emit("new message", dataToSentOnSocket);
        if (privateMessages.length > 0) {
          setPrivateMessages((prevState) => [...prevState, newMessageObject]);

          dispatch(
            addNewMessage({
              message: messageRecordId,
              data: newMessageObject,
            })
          );
        } else if (privateMessages.length === 0) {
          dispatch(addNewMessageRecord(newMessageObject));
          setPrivateMessages([newMessageObject]);
        }
      }
      setNewMessage("");
      setMessageReply(false);
    }
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
            messages={
              searchFocus && searchValue !== "" ? searchData : privateMessages
            }
            messagesLoading={messagesLoading}
            messageReply={messageReply}
            setMessageReply={setMessageReply}
            marginBottom={marginBottom}
            searchFocus={searchFocus}
            dataToBePassed={dataToBePassed}
            setDataToBePassed={setDataToBePassed}
            messageData={messageData}
            setMessageData={setMessageData}
          />
        </div>
        <InputMessage
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
