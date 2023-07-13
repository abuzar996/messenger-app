import React from "react";
import { useRouteError } from "react-router-dom";
import "./error.styles.css";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="error-container">
      <label>
        {error.status} {error.data}
      </label>
    </div>
  );
};

export default Error;
