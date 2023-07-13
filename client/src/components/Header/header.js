import React from "react";
import "./header.styles.css";

const Header = ({ children }) => {
  return <div className="header-container">{children}</div>;
};
export default Header;
