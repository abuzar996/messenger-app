import React, { useRef, useEffect } from "react";
import "./inputMessage.styles.css";

import { useKeys } from "../../hooks/useKeys";

import Button from "../Button";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import { useDimentions } from "../../hooks/useDimentions";

const InputMessage = ({ value, onClick, onChange, setSenderHeight }) => {
  const Ref = useRef(null);
  const dimentions = useDimentions();

  useEffect(() => {
    setSenderHeight(Ref.current.clientHeight);
  }, [dimentions, setSenderHeight]);
  useKeys("Enter", onClick);
  return (
    <div ref={Ref} className="input-message-container">
      <div>
        <textarea
          placeholder="write a message"
          type="text"
          value={value}
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
