import React from "react";
import { useState } from "react";

import Search from "../../components/Search";
import Header from "../../components/Header/header";
import "./appHeader.styles.css";
import UserOptionModal from "../../modals/UserOptionModal/userOptionModal";
import { Switch } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import profile from "../../images/profile.jpg";
const AppHeader = ({ darkMode, setDarkMode }) => {
  const [searchValue, setSearchValue] = useState("");
  const [optionModalOpen, setOptionModalOpen] = useState(false);
  function onInputChange(e) {
    //console.log(e.target.value);
    setSearchValue(e.target.value);
  }
  function refresh() {
    setSearchValue("");
  }
  return (
    <Header>
      {optionModalOpen ? (
        <UserOptionModal modalOpen={setOptionModalOpen} />
      ) : null}
      <div className="name-logo-container">
        <div className={optionModalOpen ? "menu-item-open " : "menu-item"}>
          <FormatAlignJustifyIcon
            fontSize="medium"
            onClick={() => {
              setOptionModalOpen(true);
            }}
          />
        </div>
        <div className="logo-item">
          <label>Messenger</label>
        </div>
        <div className="add-button">
          <AddIcon />
        </div>
      </div>
      <div className="search-container">
        <Search
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
