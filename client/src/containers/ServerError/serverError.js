import React from "react";
import "./serverError.styles.css";
import { useSelector } from "react-redux";
import "../../App.css";

const ServerError = () => {
  const { darkmode } = useSelector((state) => state.appReducer);

  let className = darkmode ? "theme-dark" : "theme-light";
  return (
    <div className={`${className} error-container custom-fonts`}>
      <div className="error-route-container">
        <div className="error-no-found">
          <label className="big-label">503: Service Not Available!</label>
        </div>
        <label className="label-inner">
          You're Not connected to the server
        </label>
        <div className="button-div-go-back">
          <button
            className="button-go-back"
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
