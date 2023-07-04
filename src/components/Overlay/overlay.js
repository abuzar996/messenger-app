import React from "react";
import { useEffect } from "react";
import "./overlay.styles.css";
const Overlay = ({ children, setModalOpen }) => {
  function keyDown(event) {
    //console.log(event.key);
    if (event.key === "Escape") {
      close();
    }
  }
  function close() {
    setModalOpen(false);
  }
  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  });
  return (
    <div className="overlay-container" onClick={close}>
      {children}
    </div>
  );
};

export default Overlay;