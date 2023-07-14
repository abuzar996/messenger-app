import React from "react";
import "./listHeader.styles.css";

import Header from "../../components/Header/header";
import Search from "../../components/Search";

const ListHeader = ({
  searchFocus,
  setSearchFocus,
  setSearchValue,
  searchValue,
}) => {
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
  return (
    <div style={{ marginTop: "1px" }}>
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
