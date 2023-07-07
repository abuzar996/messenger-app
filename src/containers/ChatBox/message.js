import React, { useRef } from "react";
import "./chatBox.styles.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Message = ({ message, onClick, setOptionModalOpen }) => {
  const messageRef = useRef(null);
  function onHandleClick(index) {
    if (onClick) {
      onClick(messageRef.current.offsetLeft, messageRef.current.offsetTop);
      setOptionModalOpen(true);
    }
  }

  return (
    <div className={message.user1 ? "inner-container-user" : "inner-container"}>
      <label className={message.user1 ? "label2" : "label1"}>
        {message.user1 ? message.user1 : message.user2}
      </label>
      <div
        style={{
          paddingBottom: "15px",
          alignItems: "center",
          justifyContent: "center",
        }}
        ref={messageRef}
      >
        <MoreHorizIcon
          className="icon-visibility"
          onClick={() => onHandleClick(message)}
        />
      </div>
    </div>
  );
};

export default Message;
