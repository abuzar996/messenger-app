import React, { useState } from "react";
import "./topNav.styles.css";

import Header from "../../components/Header/header";
import SelectUserMessageModal from "../../modals/SelectUserMessageModal";

import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

const TopNav = () => {
  const [messageModalOpen, setMessageSelectModalOpen] = useState(false);
  return (
    <div className="top-nav-container">
      {messageModalOpen ? (
        <SelectUserMessageModal modalOpen={setMessageSelectModalOpen} />
      ) : null}
      <Header>
        <div className="top-nav-inner-container">
          <div className="title-container">
            <div className="title-item">
              <label>Messaging</label>
            </div>
          </div>
          <div className="icon-container">
            <div
              className={messageModalOpen ? "icon-item-open" : "icon-item"}
              onClick={() => {
                setMessageSelectModalOpen(true);
              }}
            >
              <ForwardToInboxIcon />
            </div>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default TopNav;
