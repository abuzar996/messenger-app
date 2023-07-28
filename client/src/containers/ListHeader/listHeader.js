import React, { useEffect, useRef } from "react";
import "./listHeader.styles.css";

import Header from "../../components/Header/header";
import Search from "../../components/Search";
import { useDimentions } from "../../hooks/useDimentions";
const ListHeader = ({
  searchFocus,
  setSearchFocus,
  setSearchValue,
  searchValue,
}) => {
  const listRef = useRef();
  const windowSize = useDimentions();
  function onInputChange(e) {
    if (setSearchValue) {
      setSearchValue(e.target.value);
    }
  }
  function refresh() {
    if (setSearchValue) {
      setSearchValue("");
    }
  }
  useEffect(() => {
    localStorage.setItem("list-header-height", listRef.current.clientHeight);
  }, [windowSize]);
  return (
    <div style={{ marginTop: "1px" }} ref={listRef}>
      <Header>
        <div className="list-search-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "calc(100% - 20px)",
              padding: "2px 10px 2px 10px",
            }}
          >
            <Search
              onChange={onInputChange}
              searchValue={searchValue}
              refresh={refresh}
              searchFocus={searchFocus}
              setSearchFocus={setSearchFocus}
              searchData={"Search Messages"}
            />
          </div>
        </div>
      </Header>
    </div>
  );
};

export default ListHeader;
