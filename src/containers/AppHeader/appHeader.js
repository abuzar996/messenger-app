import React, { useState } from "react";
import "./appHeader.styles.css";

import Search from "../../components/Search";
import Header from "../../components/Header/header";
import UserOptionModal from "../../modals/UserOptionModal/userOptionModal";
import SelectUserModal from "../../modals/SelectUserModal/selectUserModal";

import { Switch } from "@mui/material";

import profile from "../../images/profile.jpg";
import SearchModal from "../../modals/SearchModal";

import AddIcon from "@mui/icons-material/Add";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

const AppHeader = ({ darkMode, setDarkMode }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  function onInputChange(e) {
    //console.log(e.target.value);
    setSearchValue(e.target.value);
  }
  function refresh() {
    setSearchValue("");
    setSearchFocused(false);
  }
  return (
    <Header>
      {searchFocused ? (
        <SearchModal
          width={+localStorage.getItem("search_width")}
          height={+localStorage.getItem("search_height")}
          left={+localStorage.getItem("search_x")}
          top={+localStorage.getItem("search_y")}
          modalOpen={setSearchFocused}
        />
      ) : null}

      {optionModalOpen ? (
        <UserOptionModal modalOpen={setOptionModalOpen} />
      ) : null}
      {selectModalOpen ? (
        <SelectUserModal modalOpen={setSelectModalOpen} />
      ) : null}

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
          className={selectModalOpen ? "add-button-open" : "add-button"}
          onClick={() => setSelectModalOpen(true)}
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
          {/* <div className="theme-label">
            <label></label>
          </div> */}
          <div style={{ paddingRight: "10px" }}>
            <Switch
              className="switch-button"
              checked={darkMode ? true : false}
              onChange={() => {
                setDarkMode(!darkMode);
              }}
            />
          </div>
          <div className="display-div">
            <img className="display-image" src={profile} alt={"user"} />
          </div>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
