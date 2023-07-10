import React from "react";
import "./userOptionModal.styles.css";

import { useKeys } from "../../hooks/useKeys";
import { Checkbox } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const UserOptionModal = ({ modalOpen }) => {
  useKeys("Escape", closeFn);
  function onSettingsClicked() {
    // console.log("onSettingsClicked");
  }
  function onLogoutClicked() {
    //console.log("onLogoutClicked");
  }
  function closeFn() {
    modalOpen(false);
  }
  return (
    <div className="options-overlay" onClick={closeFn}>
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
          <button className="option-close-button" onClick={closeFn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserOptionModal;
