import React, { useState, useRef, useEffect } from "react";
import "./search.styles.css";

import { useKeys } from "../../hooks/useKeys";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Search = ({
  onChange,
  searchValue,
  refresh,
  searchData,
  onFocus,
  useRefValue,
}) => {
  const searchReference = useRef(null);
  const [searchFocus, setSearchFocus] = useState(false);

  useKeys("Escape", escapePressed);

  function handleClick() {
    refresh();
    onFocus(false);
  }
  function escapePressed() {
    setSearchFocus(false);
    if (refresh) {
      refresh();
    }
  }
  useEffect(() => {
    if (useRefValue) {
      localStorage.setItem("search_width", searchReference.current.clientWidth);
      localStorage.setItem(
        "search_height",
        searchReference.current.clientHeight
      );
      localStorage.setItem("search_x", searchReference.current.offsetLeft);
      localStorage.setItem("search_y", searchReference.current.offsetTop);
    }
  }, [useRefValue]);
  return (
    <div ref={searchReference} className="search-inner-container">
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
            if (onFocus) {
              onFocus(true);
            }
            setSearchFocus(true);
          }}
          onBlur={() => {
            setSearchFocus(false);
            refresh();
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
