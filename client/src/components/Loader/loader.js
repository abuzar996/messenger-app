import React from "react";
import "./loader.styles.css";
import CircularProgress from "@mui/material/CircularProgress";

function Loader() {
  return (
    <div className="loader-container">
      <CircularProgress color="success" />
    </div>
  );
}

export default Loader;
