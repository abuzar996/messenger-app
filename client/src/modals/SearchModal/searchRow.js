import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const SearchRow = ({ searchString }) => {
  return (
    <div className="search-modal-search-row-container">
      <label className="search-modal-search-row-label">{searchString}</label>
      <SearchIcon className="search-modal-search-row-icon" />
    </div>
  );
};

export default SearchRow;
