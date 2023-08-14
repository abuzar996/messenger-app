import React, { memo, useRef, useEffect } from "react";
import "./search.styles.css";

import { useKeys } from "../../hooks/useKeys";
import { useDimentions } from "../../hooks/useDimentions";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Search = ({
  onChange,
  searchValue,
  refresh,
  searchData,
  onFocus,
  useRefValue,
  searchFocus,
  setSearchFocus,
}) => {
  const windowSize = useDimentions();
  const searchReference = useRef(null);
  const inputRef = useRef(null);

  useKeys("Escape", escapePressed, document.getElementsByName("search-box"));

  function handleClick() {
    refresh();
    inputRef.current.blur();
    onFocus(false);
  }
  function escapePressed() {
    if (setSearchFocus) {
      setSearchFocus(false);
    }

    if (refresh) {
      inputRef.current.blur();
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
  }, [useRefValue, windowSize]);
  return (
    <div
      name="search-box"
      ref={searchReference}
      className="search-inner-container"
    >
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
          ref={inputRef}
          onFocus={() => {
            if (onFocus) {
              onFocus(true);
            }
            if (setSearchFocus) {
              setSearchFocus(true);
            }
          }}
          onBlur={() => {
            if (setSearchFocus) {
              setSearchFocus(false);
              refresh();
            }
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

export default memo(Search);
