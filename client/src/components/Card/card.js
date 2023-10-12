import React, { useRef, useEffect, useState } from "react";
import "./card.styles.css";
import "../../App.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import users from "../../images/img2.jpg";
import user1 from "../../images/photo1.jpg";
import user2 from "../../images/photo2.jpg";
import user3 from "../../images/photo3.jpg";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDimentions } from "../../hooks/useDimentions";
import { changeMessageInfo } from "../../redux/slices/chatSlice";
const Card = ({
  index,
  modalOpen,
  firstname,
  lastname,
  lastMessage,
  onMessageClick,
  data,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [seen /*, setSeen*/] = useState(true);
  const windowSize = useDimentions();
  const references = useRef(null);
  //useEffect(() => {});
  function onHandleClick(event, data) {
    if (event.target.id === "inner-option") {
      modalOpen(true);
      dispatch(changeMessageInfo(data));
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
        <img
          className="image"
          src={
            index === 0
              ? users
              : index === 1
              ? user1
              : index === 2
              ? user2
              : user3
          }
          alt="user"
        />
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
              {lastMessage
                ? lastMessage.sender === user.firstname
                  ? "You sent a message"
                  : firstname + " sent you a message"
                : "Start a conversation"}
            </span>
          </label>
          {"opened" in lastMessage &&
            lastMessage &&
            !lastMessage.opened &&
            lastMessage.sender !== user.firstname && (
              <FiberManualRecordIcon className="padding-right" />
            )}
        </div>
      </div>
    </div>
  );
};

export default Card;
