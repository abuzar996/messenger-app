import React from "react";
import "./deleteModal.styles.css";

import Overlay from "../../components/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedMessage } from "../../redux/slices/chatSlice";
const DeleteMadal = ({ headerMessage, modalOpen, onClose }) => {
  const dispatch = useDispatch();
  const { messageRecordId, clickedId } = useSelector((state) => state.chats);
  return (
    <Overlay modalOpen={modalOpen}>
      <div
        className={
          onClose ? "delete-modal-container-close" : "delete-modal-container"
        }
      >
        <div className="delete-modal-header">
          <label className="delete-modal-header-label">{headerMessage}</label>
        </div>
        <div className="delete-modal-body">
          <label className="delete-modal-body-label">
            Are you sure you want to {headerMessage.toLowerCase()} ?
          </label>
        </div>
        <div className="delete-buttons-container">
          <button className="delete-modal-cancel-button">Cancel</button>
          <button
            className="delete-modal-delete-button"
            onClick={() => {
              if (headerMessage === "Delete Message") {
                dispatch(deleteSelectedMessage({ messageRecordId, clickedId }));
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default DeleteMadal;
