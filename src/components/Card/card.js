import React, { useRef, useEffect, useState } from "react";
import "./card.styles.css";
import "../../App.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import user from "../../images/user.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDimentions } from "../../hooks/useDimentions";

const Card = ({ modalOpen, firstname, lastname, lastMessage }) => {
  const [seen, setSeen] = useState(false);
  const windowSize = useDimentions();
  const references = useRef(null);

  useEffect(() => {
    if (lastMessage.user2 && !lastMessage.opened) {
      setSeen(false);
    } else {
      setSeen(true);
    }
  }, [lastMessage]);
  function onHandleClick() {
    modalOpen(true);
    localStorage.setItem(
      "chat_options_offsety",
      references?.current?.offsetTop
    );
  }

  useEffect(() => {
    localStorage.setItem(
      "chat_options_offsetx",
      references?.current?.offsetLeft
    );
  }, [windowSize]);

  return (
    <div className="card-body">
      <div className="img-container">
        <img className="image" src={user} alt="user" />
      </div>
      <div className="data-body">
        <div className="data-container align-center padding-left padding-top">
          <div>
            <label className="user-name">{firstname} </label>
            <label className="user-name">{lastname}</label>
          </div>
          <div ref={references} className="padding-right">
            <MoreHorizIcon
              fontSize="small"
              className="option "
              onClick={onHandleClick}
            />
          </div>
        </div>
        <div className="data-container padding-left">
          <label>
            <span className={!seen ? "un-opened-bold" : null}>
              {lastMessage.user1
                ? "You sent a message"
                : firstname + " sent you a message"}
            </span>
          </label>
          {!seen && <FiberManualRecordIcon className="padding-right" />}
        </div>
      </div>
    </div>
  );
};

export default Card;
