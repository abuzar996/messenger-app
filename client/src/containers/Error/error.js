import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import "./error.styles.css";
import { useSelector } from "react-redux";
import "../../App.css";
const Error = () => {
  const navigate = useNavigate();
  const { darkmode } = useSelector((state) => state.appReducer);
  const error = useRouteError();
  let className = darkmode ? "theme-dark" : "theme-light";
  return (
    <div className={`${className} error-container custom-fonts`}>
      <div className="error-route-container">
        <div className="error-no-found">
          <label className="big-label">{error.status}: Page Not Found!</label>
        </div>
        <label className="label-inner">{error.data}</label>
        <div className="button-div-go-back">
          <button className="button-go-back" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
