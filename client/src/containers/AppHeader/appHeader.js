import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { API } from "../../constants/data";
import "./appHeader.styles.css";
import {
  openProfileModal,
  closeProfileModal,
  openAddfriendsModal,
  closeAddfriendsModal,
  setData,
} from "../../redux/slices/appSettingSlice";
import Search from "../../components/Search";
import Header from "../../components/Header/header";
import UserOptionModal from "../../modals/UserOptionModal/userOptionModal";
import SelectUserModal from "../../modals/SelectUserModal/selectUserModal";
import profile from "../../images/profile.jpg";
import SearchModal from "../../modals/SearchModal";
import UserProfileModal from "../../modals/UserProfileModal";
import AddIcon from "@mui/icons-material/Add";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { useDimentions } from "../../hooks/useDimentions";

import { getAllTheUsers } from "../../redux/slices/userSlice";
import { searchUsers } from "../../redux/slices/searchSlice";

import {
  getChatList,
  tuneChatData,
  setSocketMessage,
  setNewNotifications,
} from "../../redux/slices/chatSlice";

import {
  closeSendMessageModal,
  getUserSettings,
} from "../../redux/slices/appSettingSlice";

import SelectUserMessageModal from "../../modals/SelectUserMessageModal";
export let socket;
const AppHeader = () => {
  const { id } = useParams();
  //console.log(id);
  const refferencesHeader = useRef(null);
  const dispatch = useDispatch();
  const {
    addNewChatLoading,
    deleteRecordLoading,
    addMessageLoading,
    favLoading,
    newMessageNotifications,
  } = useSelector((state) => state.chats);
  const { sendMessageModal } = useSelector((state) => state.appReducer);
  const { chatlist, socketMessageLoading } = useSelector(
    (state) => state.chats
  );
  const { user, allUsers } = useSelector((state) => state.user);
  const { addFriendsModal, userProfileModal } = useSelector(
    (state) => state.appReducer
  );
  const windowSize = useDimentions();
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [sentToId, setSentToId] = useState();

  useEffect(() => {
    setUserId(user.userId);
    socket = io(API);
    socket.emit("setup", user);
  }, [user]);

  useEffect(() => {
    setSentToId(+id);
    socket.emit("join chat", +id);
  }, [id]);

  useEffect(() => {
    //
    socket.on("message recieved", (data) => {
      let newData = {
        messageId: data.messageId,
        sender: data.sender,
        message: data.message,
        reply: data.reply,
      };
      if (data.sentTo === userId && data.userId === sentToId) {
        dispatch(setSocketMessage(newData));
        dispatch(getChatList(user.userId));
      } else {
        dispatch(setNewNotifications("A new Message was sent to You!"));
      }
    });
  }, [userId, sentToId, dispatch, user]);

  useEffect(() => {
    dispatch(getAllTheUsers());

    if (
      user.userId &&
      !addMessageLoading &&
      !favLoading &&
      !socketMessageLoading
    ) {
      dispatch(getChatList(user.userId));
    }
  }, [
    dispatch,
    user,
    addNewChatLoading,
    deleteRecordLoading,
    addMessageLoading,
    favLoading,
    socketMessageLoading,
    newMessageNotifications,
  ]);

  useEffect(() => {
    if (user.userId) {
      dispatch(getUserSettings(user.userId));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (chatlist.length > 0 && allUsers.length > 0) {
      let data = chatlist.map((list) => {
        let user = allUsers.find((user) => user.userId === list.userId);
        list = { ...list, firstname: user.firstname, lastname: user.lastname };
        return list;
      });
      dispatch(tuneChatData(data));
    } else {
      dispatch(tuneChatData([]));
    }
  }, [allUsers, chatlist, dispatch]);

  useEffect(() => {
    let timer;
    if (searchValue) {
      timer = setTimeout(() => {
        dispatch(searchUsers(searchValue));
      }, 300);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchValue, dispatch]);

  function closeModal() {
    dispatch(closeSendMessageModal());
  }

  function onInputChange(e) {
    setSearchValue(e.target.value);
  }
  function refresh() {
    setSearchValue("");
    setSearchFocused(false);
  }
  function handleUserClick(user) {
    if (user) {
      dispatch(openProfileModal());
      dispatch(setData(user));
      setSearchValue("");
    }
  }
  function closeUserSelectModal() {
    dispatch(closeAddfriendsModal());
  }
  function closeUserProfileModal() {
    dispatch(closeProfileModal());
  }
  useEffect(() => {
    if (refferencesHeader) {
      localStorage.setItem(
        "MainHeader-height",
        refferencesHeader.current.clientHeight
      );
    }
  }, [windowSize]);
  return (
    <div ref={refferencesHeader}>
      <Header>
        {userProfileModal && (
          <UserProfileModal setModalOpen={closeUserProfileModal} />
        )}
        {sendMessageModal && <SelectUserMessageModal modalOpen={closeModal} />}
        {searchFocused ? (
          <SearchModal
            width={+localStorage.getItem("search_width")}
            height={+localStorage.getItem("search_height")}
            left={+localStorage.getItem("search_x")}
            top={+localStorage.getItem("search_y")}
            modalOpen={setSearchFocused}
            handleUserClick={handleUserClick}
          />
        ) : null}

        {optionModalOpen && <UserOptionModal modalOpen={setOptionModalOpen} />}
        {addFriendsModal && (
          <SelectUserModal
            handleUserClick={handleUserClick}
            modalOpen={closeUserSelectModal}
          />
        )}

        <div className="name-logo-container">
          <div
            className={optionModalOpen ? "menu-item-open " : "menu-item"}
            onClick={() => {
              setOptionModalOpen(true);
            }}
          >
            <FormatAlignJustifyIcon fontSize="medium" />
          </div>
          <div className="logo-item">
            <label>Messenger</label>
          </div>
          <div
            className={addFriendsModal ? "add-button-open" : "add-button"}
            onClick={() => {
              dispatch(openAddfriendsModal());
            }}
          >
            <AddIcon />
          </div>
        </div>
        <div className="search-container">
          <Search
            useRefValue={true}
            onFocus={setSearchFocused}
            onChange={onInputChange}
            searchValue={searchValue}
            refresh={refresh}
            key={"1"}
            searchData={"Search Users or friends..."}
          />
        </div>
        <div className="theme-container">
          <div className="theme-inner-container">
            <div style={{ paddingRight: "10px" }}>
              <div className="logo-item-new">
                <label>{user.firstname}</label>
              </div>
            </div>
            <div className="display-div">
              <img className="display-image" src={profile} alt={"user"} />
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default AppHeader;
