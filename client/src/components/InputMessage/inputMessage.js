import React, { useRef, useEffect } from "react";
import "./inputMessage.styles.css";

import { useKeys } from "../../hooks/useKeys";

import Button from "../Button";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImageIcon from "@mui/icons-material/Image";
import { useDimentions } from "../../hooks/useDimentions";

const InputMessage = ({
  value,
  onClick,
  onChange,
  setSenderHeight,
  messageReply,
}) => {
  const Ref = useRef(null);
  const inputRef = useRef(null);
  const dimentions = useDimentions();

  useEffect(() => {
    if (messageReply === true) {
      inputRef.current.focus();
    }
  }, [messageReply]);

  useEffect(() => {
    setSenderHeight(Ref.current.clientHeight);
  }, [dimentions, setSenderHeight]);

  useKeys("Enter", onEnterPress, null);

  function onEnterPress() {
    inputRef.current.blur();
    onClick();
  }

  useKeys("Escape", function () {
    inputRef.current.blur();
  });

  return (
    <div ref={Ref} className="input-message-container">
      <div>
        <textarea
          ref={inputRef}
          autoFocus={messageReply}
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
          <Button onClick={onClick}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default InputMessage;
