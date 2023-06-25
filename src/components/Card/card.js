import React from "react";
import user from "../../images/user.png";
import options from "../../images/dots.svg";
import "./card.styles.css";
import "../../App.css";
const Card = () => {
  return (
    <div className="card-body">
      <div className="img-container">
        <img className="image" src={user} alt="user" />
      </div>
      <div className="data-body">
        <div className="data-container align-center padding-left padding-top">
          <label className="user-name">Abuzar Rahim</label>
          <img className="option padding-right" src={options} alt="user" />
        </div>

        <div className="data-container padding-left">
          <label>Abuzar Sent you a message</label>
        </div>
      </div>
    </div>
  );
};

export default Card;
