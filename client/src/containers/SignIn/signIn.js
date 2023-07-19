import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./signIn.styles.css";
import "../../App.css";
import { loginUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDimentions } from "../../hooks/useDimentions";

const SignIn = () => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const dispatch = useDispatch();
  //const [isAuthenticated] = useState(false);
  const navigate = useNavigate();
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
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/home");
    }
  }, [navigate, isAuthenticated]);
  function onSignInClick() {
    dispatch(
      loginUser({
        email: "allison@gmail.com",
        password: "123456",
      })
    );
  }
  function onCancelClick() {
    setEmail("");
    setPassword("");
  }
  function onSignUpClick() {
    navigate("/signup");
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  function onEmailChange(e) {
    setEmail(e.target.value);
  }
  return (
    <div className="theme-dark custom-fonts App uniform-colors">
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
              <button className="sign-in-button" onClick={onSignInClick}>
                Sign In
              </button>
            </div>
            <div className="sign-in-card-label-body">
              <label className="sign-in-end-label">
                Not a member? <span onClick={onSignUpClick}>SignUp</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
