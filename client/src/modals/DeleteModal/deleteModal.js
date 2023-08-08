import React from "react";
import "./deleteModal.styles.css";
import { useParams, useNavigate } from "react-router-dom";
import Overlay from "../../components/Overlay";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteChatRecord,
  deleteSelectedMessage,
  changeMessageInfo,
} from "../../redux/slices/chatSlice";

const DeleteMadal = ({ headerMessage, modalOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { messageRecordId, clickedId, messageInfo } = useSelector(
    (state) => state.chats
  );
  const { privateMessages } = useSelector((state) => state.chats);

  function onDeleteClicked() {
    if (headerMessage === "Delete Message") {
      if (privateMessages === 1) {
        dispatch(deleteSelectedMessage({ messageRecordId, clickedId }));
        dispatch(deleteChatRecord({ userId: user.userId, clientId: +id }));
        navigate("/app/home");
      } else {
        dispatch(deleteSelectedMessage({ messageRecordId, clickedId }));
      }
    } else {
      dispatch(
        deleteChatRecord({ userId: user.userId, clientId: messageInfo.userId })
      );
      dispatch(changeMessageInfo({}));
      //console.log(messageInfo);
    }
  }

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
            onClick={onDeleteClicked}
          >
            Delete
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default DeleteMadal;
