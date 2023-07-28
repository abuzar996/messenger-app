import React from "react";
import "./selectUserMessageModal.styles.css";
import { useDispatch } from "react-redux";
import { closeSendMessageModal } from "../../redux/slices/appSettingSlice";
import User from "./Users";
import Overlay from "../../components/Overlay";
const SelectUserMessageModal = ({ modalOpen }) => {
  const dispatch = useDispatch();
  return (
    <Overlay modalOpen={modalOpen}>
      <div className="select-message-user-modal-container">
        <div className="select-message-user-modal-header">
          <div>
            <label>Select To Send message</label>
          </div>
        </div>
        <div className="select-message-user-modal-body">
          <User />
          <User />
          <User />
          <User />
          <User />
        </div>
        <div style={{ marginTop: "5px", padding: "10px" }}>
          <button
            className="select-message-user-close-button"
            onClick={() => {
              dispatch(closeSendMessageModal());
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default SelectUserMessageModal;
