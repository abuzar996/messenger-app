import React, { useRef, useEffect, useState } from "react";
import "./card.styles.css";
import "../../App.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import users from "../../images/user.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDimentions } from "../../hooks/useDimentions";
import { useSelector } from "react-redux";
const Card = ({
  modalOpen,
  firstname,
  lastname,
  lastMessage,
  onMessageClick,
  data,
}) => {
  const { user } = useSelector((state) => state.user);
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
  function onHandleClick(event, data) {
    if (event.target.id === "inner-option") {
      modalOpen(true);
      localStorage.setItem(
        "chat_options_offsety",
        references?.current?.offsetTop
      );
    } else {
      onMessageClick(data);
    }
  }

  useEffect(() => {
    localStorage.setItem(
      "chat_options_offsetx",
      references?.current?.offsetLeft
    );
  }, [windowSize]);

  return (
    <div
      className="card-body"
      onClick={(event) => {
        onHandleClick(event, data);
      }}
    >
      <div className="img-container">
        <img className="image" src={users} alt="user" />
      </div>
      <div className="data-body">
        <div className="data-container align-center padding-left padding-top">
          <div>
            <label className="user-name">{firstname} </label>
            <label className="user-name">{lastname}</label>
          </div>
          <div ref={references} className="padding-right">
            <MoreHorizIcon
              id="inner-option"
              fontSize="small"
              className="option "
              onClick={(event) => onHandleClick(event, data)}
            />
          </div>
        </div>
        <div className="data-container padding-left">
          <label>
            <span className={!seen ? "un-opened-bold" : null}>
              {lastMessage.sender === user.firstname
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
