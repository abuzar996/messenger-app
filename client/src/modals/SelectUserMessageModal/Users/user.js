import React from "react";
import "./user.styles.css";

import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
const User = ({ firstname, lastname, userId }) => {
  const navigate = useNavigate();
  return (
    <div className="modal-message-user-container">
      <div>
        <div>
          <img
            className="user-message-image"
            src={require("../../../images/profile.jpg")}
            alt={"user"}
          />
        </div>
        <div className="option-message-label-div">
          <label className="option-message-label">
            {`${firstname} ${lastname}`}
          </label>
        </div>
      </div>
      <div className="option-message-icons">
        <div>
          <SendIcon
            className="option-message-icon-select"
            onClick={() => {
              navigate(`/app/messages/${userId}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default User;
