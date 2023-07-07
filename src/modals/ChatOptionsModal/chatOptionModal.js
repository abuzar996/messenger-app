import React, { useEffect, useRef } from "react";
import "./chatOptionModal.styles.css";

import Overlay from "../../components/Overlay";

import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatOptionModal = ({ topVal, leftVal, modalOpen, deleteModal }) => {
  const reference = useRef(null);
  useEffect(() => {
    if (reference) {
      localStorage.setItem("height", reference.current.clientHeight);
      localStorage.setItem("width", reference.current.clientWidth);
    }
  });
  return (
    <Overlay modalOpen={modalOpen}>
      <div
        ref={reference}
        className="chat-option-modal-container"
        style={{ top: topVal, left: leftVal }}
      >
        <div className="chat-option-modal-list">
          <StarPurple500Icon className="chat-option-icons" />
          <label className="chat-option-label">Mark Favourite</label>
        </div>
        <div
          className="chat-option-modal-list"
          onClick={(event) => {
            deleteModal(true);
            event.preventDefault();
          }}
        >
          <DeleteIcon className="chat-option-icons" />
          <label className="chat-option-label">Delete</label>
        </div>
      </div>
    </Overlay>
  );
};

export default ChatOptionModal;
