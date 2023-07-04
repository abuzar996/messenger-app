import React from "react";
import "./overlay.styles.css";
const Overlay = ({ children, setModalOpen }) => {
  return (
    <div
      className="overlay-container"
      onClick={() => {
        setModalOpen(false);
      }}
    >
      {children}
    </div>
  );
};

export default Overlay;
