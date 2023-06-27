import React from "react";
import "./button.style.css";
const Button = ({ onClick, children }) => {
  return (
    <div onClick={onClick.bind(this)} className="button-container">
      {children}
    </div>
  );
};

export default Button;
