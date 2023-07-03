import React from "react";
import { useState } from "react";

import Header from "../../components/Header/header";
import Search from "../../components/Search";

import "./listHeader.styles.css";

const ListHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  function onInputChange(e) {
    //console.log(e.target.value);
    setSearchValue(e.target.value);
  }
  function refresh() {
    setSearchValue("");
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
              searchData={"Search Messages"}
            />
          </div>
        </div>
      </Header>
    </div>
  );
};

export default ListHeader;
