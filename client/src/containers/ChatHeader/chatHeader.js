import React from "react";
import "./chatHeader.styles.css";
import { useNavigate } from "react-router-dom";
import Search from "../../components/Search";

import StarPurple500Icon from "@mui/icons-material/StarPurple500";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ChatHeader = ({
  firstname,
  searchValue,
  setSearchValue,
  searchFocus,
  setSearchFocus,
}) => {
  const navigate = useNavigate();

  function onInputChange(e) {
    setSearchValue(e.target.value);
  }
  function refresh() {
    setSearchValue("");
  }
  function onBackClick() {
    navigate("/app/home");
  }
  return (
    <div className="chat-header">
      <div className="chat-name-container">
        <div className="back-item">
          <ArrowBackIcon onClick={onBackClick} />
        </div>
        <div className="chat-name">
          <label>{firstname}</label>
        </div>
      </div>
      <div className="chat-search-container">
        <Search
          searchFocus={searchFocus}
          setSearchFocus={setSearchFocus}
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
