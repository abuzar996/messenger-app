import React from "react";
import "./user.styles.css";

import SendIcon from "@mui/icons-material/Send";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const User = () => {
  return (
    <div className="modal-user-container">
      <div>
        <div>
          <img
            className="user-image"
            src={require("../../../images/profile.jpg")}
            alt={"user"}
          />
        </div>
        <div className="option-label-div">
          <label className="option-label">Abuzar Rahim</label>
        </div>
      </div>
      <div className="option-icons">
        <div>
          <PersonAddIcon className="option-icon-select" />
        </div>
        <div>
          <SendIcon className="option-icon-select" />
        </div>
      </div>
    </div>
  );
};

export default User;
