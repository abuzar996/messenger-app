import React from "react";
import "./search.styles.css";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
const Search = ({ onChange }) => {
  const [searchFocus, setSearchFocus] = useState(false);
  const keyElement = document.getElementById("search-id");
  function handleClick() {
    keyElement.value = "";
  }
  function handleKeyDown(e) {
    if (e.key === "Escape") {
      escapePressed();
    }
  }
  function escapePressed() {
    if (keyElement) {
      keyElement.value = "";
      keyElement.blur();
    }
    setSearchFocus(false);
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
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
          id="search-id"
          placeholder={!searchFocus ? "Search" : ""}
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
