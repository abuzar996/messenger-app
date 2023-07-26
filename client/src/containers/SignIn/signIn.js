import React, { useState, useRef, useEffect } from "react";
import "./signIn.styles.css";
import "../../App.css";

import Form from "./form";

import { useDimentions } from "../../hooks/useDimentions";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginWithToken } from "../../redux/slices/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const { darkmode } = useSelector((state) => state.appReducer);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const navigate = useNavigate();
  const windowSize = useDimentions();
  const pageRef = useRef(null);
  const modalRef = useRef(null);
  const [topVal, setTopVal] = useState(null);
  const [leftVal, setLeftVal] = useState(null);

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
    if (!isAuthenticated) {
      let token = localStorage.getItem("Token");
      if (token) {
        dispatch(loginWithToken());
      }
    }
    if (isAuthenticated === true) {
      navigate("/app/home");
    }
  }, [navigate, isAuthenticated, dispatch]);

  function onSignUpClick() {
    navigate("/signup");
  }

  let classname = darkmode ? "theme-dark" : "theme-light";
  return (
    <>
      <div className={`${classname} custom-fonts App uniform-colors`}>
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
              <Form />
              <div className="sign-in-card-label-body">
                <label className="sign-in-end-label">
                  Not a member? <span onClick={onSignUpClick}>SignUp</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
