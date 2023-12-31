import React, { useEffect, useRef } from "react";
import Overlay from "../../components/Overlay";
import "./messageOptionModal.styles.css";

import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";

const MessageOptionsModal = ({
  topVal,
  leftVal,
  modalOpen,
  deleteModal,
  onReplyClick,
}) => {
  const reference = useRef(null);
  useEffect(() => {
    if (reference) {
      localStorage.setItem("height_message", reference.current.clientHeight);
      localStorage.setItem("width_message", reference.current.clientWidth);
    }
  });
  return (
    <Overlay modalOpen={modalOpen}>
      <div
        ref={reference}
        className="message-option-modal-container"
        style={{ top: topVal, left: leftVal }}
      >
        <div
          className="message-option-modal-list"
          onClick={onReplyClick.bind(this)}
        >
          <ReplyIcon className="message-option-icons" />
          <label className="message-option-label">Reply</label>
        </div>

        <div
          className="message-option-modal-list"
          onClick={(event) => {
            deleteModal(true);
            event.preventDefault();
          }}
        >
          <DeleteIcon className="message-option-icons" />
          <label className="message-option-label">Delete</label>
        </div>
      </div>
    </Overlay>
  );
};

export default MessageOptionsModal;
