import React from "react";
import "./searchModal.styles.css";
import SearchList from "./searchList";
const SearchModal = ({ modalOpen, width, left, height, top }) => {
  return (
    <div
      style={{ left: left, width: width, top: height + top + 4 }}
      className="search-modal-area-container"
    >
      <SearchList />
    </div>
  );
};

export default SearchModal;
