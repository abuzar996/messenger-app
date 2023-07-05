import React, { useState } from "react";
import "./search.styles.css";

import { useKeys } from "../../hooks/useKeys";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Search = ({ onChange, searchValue, refresh, searchData }) => {
  const [searchFocus, setSearchFocus] = useState(false);

  useKeys("Escape", escapePressed);

  function handleClick() {
    refresh();
  }
  function escapePressed() {
    setSearchFocus(false);
    if (refresh) {
      refresh();
    }
  }

  return (
    <div className="search-inner-container">
      <div className={searchFocus ? "search-none" : "search-img"}>
        <SearchIcon style={{ display: "flex", paddingLeft: "5px" }} />
      </div>
      <div className="input-field">
        <input
          onChange={onChange.bind(this)}
          className="input-text"
          type="text"
          placeholder={!searchFocus ? (searchData ? searchData : "Search") : ""}
          value={searchValue}
          onFocus={() => {
            setSearchFocus(true);
          }}
          onBlur={() => {
            setSearchFocus(false);
          }}
        />
      </div>
      <div className="close-icon" onClick={handleClick}>
        {searchFocus ? (
          <CloseIcon />
        ) : (
          <CloseIcon style={{ visibility: "hidden" }} />
        )}
      </div>
    </div>
  );
};

export default Search;
