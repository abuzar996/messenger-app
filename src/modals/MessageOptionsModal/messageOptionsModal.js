import React, { useEffect, useRef, useState } from "react";
import Overlay from "../../components/Overlay";
import DeleteModal from "../DeleteModal/deleteModal";
import "./messageOptionsModal.style.css";

import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";

const MessageOptionsModal = ({ topVal, leftVal, modalOpen }) => {
  const reference = useRef(null);
  const [confirmModal, setConfirmModal] = useState(false);
  useEffect(() => {
    if (reference) {
      localStorage.setItem("height", reference.current.clientHeight);
      localStorage.setItem("width", reference.current.clientWidth);
    }
  });
  return (
    <Overlay modalOpen={modalOpen}>
      {confirmModal ? <DeleteModal modalOpen={setConfirmModal} /> : null}
      <div
        ref={reference}
        className="message-option-modal-container"
        style={{ top: topVal, left: leftVal }}
      >
        <div className="message-option-modal-list">
          <ReplyIcon className="message-option-icons" />
          <label className="message-option-label">Reply</label>
        </div>
        <div className="message-option-modal-list">
          <DeleteIcon className="message-option-icons" />
          <label className="message-option-label">Delete</label>
        </div>
      </div>
    </Overlay>
  );
};

export default MessageOptionsModal;
