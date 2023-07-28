import React from "react";
import "./user.styles.css";

import SendIcon from "@mui/icons-material/Send";

const User = ({ firstname, lastname }) => {
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
          <SendIcon className="option-message-icon-select" />
        </div>
      </div>
    </div>
  );
};

export default User;
