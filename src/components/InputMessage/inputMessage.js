import React from "react";
import Button from "../Button";
import "./inputMessage.styles.css";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
const InputMessage = ({ onClick, onChange }) => {
  return (
    <div className="input-message-container">
      <div>
        <textarea
          placeholder="write a message"
          type="text"
          onChange={onChange.bind(this)}
        />
      </div>
      <div id="option-message-container">
        <div className="message-icons-container">
          <div>
            <EmojiEmotionsIcon />
          </div>
          <div>
            <AttachFileIcon />
          </div>
          <div>
            <ImageIcon />
          </div>
        </div>
        <div className="message-button-container">
          <Button onClick={onClick.bind(this)}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default InputMessage;
