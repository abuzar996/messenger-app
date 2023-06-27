import React from "react";
import "./inputMessage.styles.css";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
const InputMessage = () => {
  return (
    <div className="input-message-container">
      <div>
        <textarea placeholder="write a message" type="text" />
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
        <div className="message-button-container">hello</div>
      </div>
    </div>
  );
};

export default InputMessage;
