import React from "react";
import "./overlay.styles.css";

import { useKeys } from "../../Hooks/useKeys";

const Overlay = ({ children, modalOpen }) => {
  useKeys("Escape", close);

  function close() {
    if (modalOpen) {
      modalOpen(false);
    }
  }
  return (
    <div className="overlay-container" onClick={close}>
      {children}
    </div>
  );
};

export default Overlay;
