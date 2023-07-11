import React, { useState, useRef, useEffect } from "react";
import "./signIn.styles.css";

import { useDimentions } from "../../hooks/useDimentions";
const SignIn = () => {
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
    <div ref={pageRef} className="sign-in-page-container">
      <div
        ref={modalRef}
        className="sign-in-card-container"
        style={{ top: topVal, left: leftVal }}
      >
        <div className="sign-in-card-header">
          <label className="sign-in-card-header-label">Sign In</label>
        </div>
        <div className="sign-in-card-body">
          <div className="sign-in-card-body-child">
            <input
              className="sign-in-card-body-child-input"
              placeholder="Username or email"
              type="text"
              autoComplete="off"
              value={email}
              onChange={onEmailChange}
            />
          </div>
          <div className="sign-in-card-body-child">
            <form>
              <input
                className="sign-in-card-body-child-input"
                placeholder="Password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={onPasswordChange}
              />
            </form>
          </div>
          <div className="sign-in-card-button-body">
            <button className="sign-in-close-button" onClick={onCancelClick}>
              Cancel
            </button>
            <button className="sign-in-button">Sign In</button>
          </div>
          <div className="sign-in-card-label-body">
            <label className="sign-in-end-label">
              Not a member? <span onClick={onSignUpClick}>SignUp</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
