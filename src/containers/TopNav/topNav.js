import React from "react";
import "./topNav.styles.css";

import Header from "../../components/Header/header";

import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

const TopNav = () => {
  return (
    <div className="top-nav-container">
      <Header>
        <div className="top-nav-inner-container">
          <div className="title-container">
            <div className="title-item">
              <label>Messaging</label>
            </div>
          </div>
          <div className="icon-container">
            <div className="icon-item">
              <ForwardToInboxIcon />
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default TopNav;
