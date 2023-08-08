import React, { useEffect, useRef } from "react";
import "./chatOptionModal.styles.css";
import Overlay from "../../components/Overlay";
import { useSelector, useDispatch } from "react-redux";
import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDimentions } from "../../hooks/useDimentions";
import {
  changeMessageInfo,
  changeChatFavForUser,
} from "../../redux/slices/chatSlice";

const ChatOptionModal = ({ topVal, leftVal, modalOpen, deleteModal }) => {
  const dispatch = useDispatch();
  const { messageInfo } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.user);
  const windowSize = useDimentions();
  const reference = useRef(null);
  useEffect(() => {
    if (reference) {
      localStorage.setItem("height", reference.current.clientHeight);
      localStorage.setItem("width", reference.current.clientWidth);
    }
  }, [windowSize]);
  return (
    <Overlay modalOpen={modalOpen}>
      <div
        ref={reference}
        className="chat-option-modal-container"
        style={{ top: topVal, left: leftVal }}
      >
        <div
          className="chat-option-modal-list"
          onClick={() => {
            dispatch(
              changeChatFavForUser({
                userId: user.userId,
                chatId: messageInfo.userId,
              })
            );
            dispatch(changeMessageInfo({}));
          }}
        >
          <StarPurple500Icon className="chat-option-icons" />
          <label className="chat-option-label">
            {messageInfo.favourite ? "Remove Favourite" : "Mark Favourite"}
          </label>
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
