import React, { useState, useRef, useEffect } from "react";
import "./signUp.styles.css";

import { useDimentions } from "../../hooks/useDimentions";
const SignUp = () => {
  const windowSize = useDimentions();
  const pageRef = useRef(null);
  const modalRef = useRef(null);
  const [topVal, setTopVal] = useState(null);
  const [leftVal, setLeftVal] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (pageRef) {
      const pageWidth = pageRef.current.clientWidth;
      const pageHeight = pageRef.current.clientHeight;
      const modalWidth = modalRef.current.clientWidth;
      const modalHeight = modalRef.current.clientHeight;
      setLeftVal(pageWidth / 2 - modalWidth / 2);
      setTopVal(pageHeight / 2 - modalHeight / 2);
    }
  }, [windowSize]);
  function onCancelClick() {
    setEmail("");
    setPassword("");
  }
  function onSignUpClick() {
    console.log("onSignUpClick");
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  function onEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <div ref={pageRef} className="sign-up-page-container">
      <div
        ref={modalRef}
        className="sign-up-card-container"
        style={{ top: topVal, left: leftVal }}
      >
        <div className="sign-up-card-header">
          <label className="sign-up-card-header-label">Sign Up</label>
        </div>
        <div className="sign-up-card-body">
          <div className="sign-up-card-body-child">
            <input
              className="sign-up-card-body-child-input"
              placeholder="First Name"
              type="text"
              autoComplete="off"
              value={email}
              onChange={onEmailChange}
            />
          </div>
          <div className="sign-up-card-body-child">
            <input
              className="sign-up-card-body-child-input"
              placeholder="Last Name"
              type="text"
              autoComplete="off"
              value={email}
              onChange={onEmailChange}
            />
          </div>
          <div className="sign-up-card-body-child">
            <input
              className="sign-up-card-body-child-input"
              placeholder="Email"
              type="text"
              autoComplete="off"
              value={email}
              onChange={onEmailChange}
            />
          </div>
          <div className="sign-up-card-body-child">
            <form>
              <input
                className="sign-up-card-body-child-input"
                placeholder="Password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={onPasswordChange}
              />
            </form>
          </div>
          <div className="sign-up-card-body-child">
            <form>
              <input
                className="sign-up-card-body-child-input"
                placeholder="Confirm Password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={onPasswordChange}
              />
            </form>
          </div>
          <div className="sign-up-card-button-body">
            <button className="sign-up-close-button" onClick={onCancelClick}>
              Cancel
            </button>
            <button className="sign-up-button">Sign Up</button>
          </div>
          <div className="sign-up-card-label-body">
            <label className="sign-up-end-label">
              Already a member? <span onClick={onSignUpClick}>SignIn</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
