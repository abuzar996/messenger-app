import React from "react";
import user from "../../images/user.png";
import "./card.styles.css";
const Card = () => {
  return (
    <div className="card-body">
      <div className="row">
        <div>
          <img src={user} alt="user" />
        </div>
        <div className="row">
          <label>Abuzar</label>
        </div>
      </div>
    </div>
  );
};

export default Card;
