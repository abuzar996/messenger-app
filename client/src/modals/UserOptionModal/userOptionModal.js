import React from "react";
import "./userOptionModal.styles.css";
import { useSelector } from "react-redux";
import { useKeys } from "../../hooks/useKeys";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { changeTheme } from "../../redux/slices/appSettingSlice";
const UserOptionModal = ({ modalOpen }) => {
  const { darkmode } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useKeys("Escape", closeFn);
  function onSettingsClicked() {}
  function onLogoutClicked() {
    dispatch(logoutUser());
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
        <div className="user-option-modal-body" onClick={onSettingsClicked}>
          <SettingsIcon className="user-option-modal-icons" />
          <label>Settings</label>
        </div>
        <div className="user-option-modal-body" onClick={onLogoutClicked}>
          <LogoutIcon className="user-option-modal-icons" />
          <label>Logout</label>
        </div>
        <div className="user-option-modal-body">
          <Checkbox
            style={{ width: "20px" }}
            color="default"
            size="small"
            checked={darkmode}
            onChange={() => {
              dispatch(changeTheme());
            }}
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
