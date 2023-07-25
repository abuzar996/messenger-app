import React from "react";
import "./searchModal.styles.css";

import SearchList from "./searchList";
import Overlay from "../../components/Overlay";

const SearchModal = ({
  modalOpen,
  width,
  left,
  height,
  top,
  users,
  handleUserClick,
}) => {
  return (
    <Overlay modalOpen={modalOpen}>
      <div
        style={{ left: left, width: width, top: height + top + 4 }}
        className="search-modal-area-container"
      >
        <SearchList users={users} handleUserClick={handleUserClick} />
      </div>
    </Overlay>
  );
};

export default SearchModal;
