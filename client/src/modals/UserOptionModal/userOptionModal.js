import React from "react";
import "./userOptionModal.styles.css";
import { useSelector } from "react-redux";
import { useKeys } from "../../hooks/useKeys";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import HideSourceIcon from "@mui/icons-material/HideSource";
import { removeAllUsers } from "../../redux/slices/userSlice";
import { changeUserSettings } from "../../redux/slices/appSettingSlice";
import PreviewIcon from "@mui/icons-material/Preview";
import { showChats, hideChats } from "../../redux/slices/appSettingSlice";
const UserOptionModal = ({ modalOpen }) => {
  const { darkmode, chatsHidden } = useSelector((state) => state.appReducer);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useKeys("Escape", closeFn);
  // function onSettingsClicked() {}
  function onLogoutClicked() {
    dispatch(logoutUser());
    dispatch(removeAllUsers());
    navigate("/signIn");
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
        {!chatsHidden && (
          <div
            className="user-option-modal-body"
            onClick={() => {
              dispatch(hideChats());
            }}
          >
            <HideSourceIcon className="user-option-modal-icons" />
            <label>Hide Chats</label>
          </div>
        )}

        {chatsHidden && (
          <div
            className="user-option-modal-body"
            onClick={() => {
              dispatch(showChats());
            }}
          >
            <PreviewIcon className="user-option-modal-icons" />
            <label>Show Chats</label>
          </div>
        )}

        <div className="user-option-modal-body" onClick={onLogoutClicked}>
          <LogoutIcon className="user-option-modal-icons" />
          <label>Logout</label>
        </div>
        <div
          className="user-option-modal-body"
          onClick={() => {
            dispatch(changeUserSettings(user.userId));
          }}
        >
          <Checkbox
            style={{ width: "20px" }}
            color="default"
            size="small"
            checked={darkmode}
          />
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
