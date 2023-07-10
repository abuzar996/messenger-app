import React, { useRef, useEffect } from "react";
import "./card.styles.css";
import "../../App.css";

import user from "../../images/user.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDimentions } from "../../hooks/useDimentions";

const Card = ({ modalOpen, name }) => {
  const windowSize = useDimentions();
  const references = useRef(null);
  function onHandleClick() {
    modalOpen(true);
  }
  useEffect(() => {
    localStorage.setItem(
      "chat_options_offsetx",
      references?.current?.offsetLeft
    );
    localStorage.setItem(
      "chat_options_offsety",
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
          <label className="user-name">{name}</label>
          <div ref={references} className="padding-right">
            <MoreHorizIcon
              fontSize="small"
              className="option "
              onClick={onHandleClick}
            />
          </div>
        </div>

        <div className="data-container padding-left">
          <label>Abuzar Sent you a message</label>
        </div>
      </div>
    </div>
  );
};

export default Card;
