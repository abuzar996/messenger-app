import React, { useEffect } from "react";
import "./userOptionModal.styles.css";

import { Checkbox } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const UserOptionModal = ({ modalOpen }) => {
  function onSettingsClicked() {
    console.log("onSettingsClicked");
  }
  function onLogoutClicked() {
    console.log("onLogoutClicked");
  }
  function close() {
    modalOpen(false);
  }
  function keyDown(event) {
    if (event.key === "Escape") {
      close();
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  });
  return (
    <div className="options-overlay" onClick={close}>
      <div className="user-option-modal-container">
        <div className="user-option-modal-header">
          <label>Options</label>
        </div>
        <div className="user-option-modal-body" onClick={onSettingsClicked}>
          <SettingsIcon className="user-option-modal-icons" />
          <label>Settings</label>
        </div>
        <div className="user-option-modal-body" onClick={onLogoutClicked}>
          <LogoutIcon className="user-option-modal-icons" />
          <label>Logout</label>
        </div>
        <div className="user-option-modal-body">
          <Checkbox style={{ width: "20px" }} color="default" size="small" />
          <label>Dark Theme</label>
        </div>
        <div className="user-option-close-button">
          <button className="option-close-button" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserOptionModal;
