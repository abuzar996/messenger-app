import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./appHeader.styles.css";

import Search from "../../components/Search";
import Header from "../../components/Header/header";
import UserOptionModal from "../../modals/UserOptionModal/userOptionModal";
import SelectUserModal from "../../modals/SelectUserModal/selectUserModal";
import profile from "../../images/profile.jpg";
import SearchModal from "../../modals/SearchModal";
import UserProfileModal from "../../modals/UserProfileModal";
import AddIcon from "@mui/icons-material/Add";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import {
  openAddfriendsModal,
  closeAddfriendsModal,
} from "../../redux/slices/appSettingSlice";
import { useDimentions } from "../../hooks/useDimentions";

import { searchUsers } from "../../redux/slices/searchSlice";

const AppHeader = () => {
  const refferencesHeader = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { addFriendsModal } = useSelector((state) => state.appReducer);
  const windowSize = useDimentions();
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [optionModalOpen, setOptionModalOpen] = useState(false);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
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

  function onInputChange(e) {
    setSearchValue(e.target.value);
  }
  function refresh() {
    setSearchValue("");
    setSearchFocused(false);
  }
  function handleUserClick(user) {
    if (user) {
      setProfileData(user);
      setProfileModalOpen(true);
      setSearchValue("");
    }
  }
  function closeUserSelectModal() {
    dispatch(closeAddfriendsModal());
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
        {profileModalOpen && (
          <UserProfileModal
            setModalOpen={setProfileModalOpen}
            {...profileData}
          />
        )}
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
