import React from "react";
import "./selectUserModal.styles.css";

import Overlay from "../../components/Overlay";
import User from "./Users";

const SelectUserModal = () => {
  return (
    <Overlay>
      <div className="select-user-modal-container">
        <div className="select-user-modal-header">
          <div>
            <label>Quick Add</label>
          </div>
        </div>
        <div className="select-user-modal-body">
          <User />
          <User />
          <User />
          <User />
          <User />
        </div>
        <div style={{ marginTop: "5px", padding: "10px" }}>
          <button className="select-user-close-button">Close</button>
        </div>
      </div>
    </Overlay>
  );
};

export default SelectUserModal;
