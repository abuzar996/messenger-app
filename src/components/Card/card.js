import React from "react";
import "./card.styles.css";
import "../../App.css";

import user from "../../images/user.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Card = () => {
  return (
    <div className="card-body">
      <div className="img-container">
        <img className="image" src={user} alt="user" />
      </div>
      <div className="data-body">
        <div className="data-container align-center padding-left padding-top">
          <label className="user-name">Abuzar Rahim</label>
          <MoreHorizIcon className="option padding-right" />
        </div>

        <div className="data-container padding-left">
          <label>Abuzar Sent you a message</label>
        </div>
      </div>
    </div>
  );
};

export default Card;
