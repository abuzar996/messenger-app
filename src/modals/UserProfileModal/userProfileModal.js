import React from "react";
import "./userProfileModal.styles.css";

import Overlay from "../../components/Overlay";

import profile from "../../images/profile.jpg";

import PhoneIcon from "@mui/icons-material/Phone";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";

const UserProfileModal = ({ setModalOpen }) => {
  return (
    <Overlay modalOpen={setModalOpen}>
      <div className="user-profile-modal-container">
        <div className="user-profile-header">
          <div>
            <label>Abuzar Rahim</label>
          </div>
          <div>
            <PersonAddIcon className="user-profile-add-icon" />
          </div>
        </div>
        <div className="user-profile-image-container">
          <img className="user-profile-image" src={profile} alt={"profile"} />
        </div>
        <div className="user-profile-info">
          <div className="user-profile-info-user-name">
            <div>
              <PersonIcon className="user-profile-add-icon" />
            </div>
            <div>
              <label className="user-profile-label">abuzar.rahim.1</label>
            </div>
          </div>
        </div>
        <div className="user-profile-info">
          <div className="user-profile-info-user-name">
            <div>
              <PhoneIcon className="user-profile-add-icon" />
            </div>
            <div>
              <label className="user-profile-label">+923227258697</label>
            </div>
          </div>
        </div>
        <div className="user-profile-button-container">
          <div className="user-profile-close-button">
            <button
              className="message-button"
              onClick={() => {
                console.log("hello world");
              }}
            >
              Send a message
            </button>
          </div>
          <div className="user-profile-close-button">
            <button
              className="close-button"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default UserProfileModal;
