import React from "react";
// import Search from "../Search";
// import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
// import { useState } from "react";
// import { Switch } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";

import "./header.styles.css";

const Header = ({ darkMode, setDarkMode, children }) => {
  // const [searchValue, setSearchValue] = useState("");
  // function onInputChange(e) {
  //   //console.log(e.target.value);
  //   setSearchValue(e.target.value);
  // }
  // function refresh() {
  //   setSearchValue("");
  // }
  return <div className="header-container">{children}</div>;
};
export default Header;
