import React, { useState } from "react";
import "./chatHeader.styles.css";

import Search from "../../components/Search";

import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ChatHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  function onInputChange(e) {
    //console.log(e.target.value);
    setSearchValue(e.target.value);
  }
  function refresh() {
    setSearchValue("");
  }
  return (
    <div className="chat-header">
      <div className="chat-name-container">
        <div className="back-item">
          <ArrowBackIcon />
        </div>
        <div className="chat-name">
          <label>Abuzar Rahim</label>
        </div>
      </div>
      <div className="chat-search-container">
        <Search
          onChange={onInputChange}
          searchValue={searchValue}
          refresh={refresh}
          key={"1"}
          searchData={"Search converstions"}
        />
      </div>
      <div className="chat-icons-container">
        <div>
          <StarPurple500Icon />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
