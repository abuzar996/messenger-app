import React from "react";
import Search from "../Search";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

import { Switch } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "./header.styles.css";
const Header = ({ darkMode, setDarkMode }) => {
  function onInputChange(e) {
    //console.log(e.target.value);
  }
  return (
    <div className="header-container">
      <div className="name-logo-container">
        <div className="menu-item">
          <FormatAlignJustifyIcon fontSize="medium" />
        </div>
        <div className="logo-item">
          <label>Messenger</label>
        </div>
        <div className="add-button">
          <AddIcon />
        </div>
      </div>
      <div className="search-container">
        <Search onChange={onInputChange} key={"1"} />
      </div>
      <div className="theme-container">
        <div className="theme-inner-container">
          <div className="theme-label">
            <label>Dark Mode</label>
          </div>
          <div>
            <Switch
              className="switch-button"
              checked={darkMode ? true : false}
              onChange={() => {
                setDarkMode(!darkMode);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
