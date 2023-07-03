import React from "react";
import "./homeBody.styles.css";
import logo from "../../../images/logo.svg";
const HomeBody = () => {
  return (
    <div className="home-body-container">
      <img src={logo} alt={"logo"} />
      <label>Start a new chat</label>
      <label>Search for new friends</label>
    </div>
  );
};

export default HomeBody;
