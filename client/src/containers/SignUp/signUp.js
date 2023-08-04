import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from "./form";
import "./signUp.styles.css";
import "../../App.css";
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/slices/notificationSlice";
import { addSettingsForNewUser } from "../../redux/slices/appSettingSlice";
import { refreshState } from "../../redux/slices/userSlice";

import { useDimentions } from "../../hooks/useDimentions";

const SignUp = () => {
  const dispatch = useDispatch();
  const { darkmode } = useSelector((state) => state.appReducer);

  const { error, success } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const windowSize = useDimentions();
  const pageRef = useRef(null);
  const modalRef = useRef(null);
  const [topVal, setTopVal] = useState(null);
  const [leftVal, setLeftVal] = useState(null);
  useEffect(() => {
    if (error !== "")
      dispatch(
        addNotification({
          message: error,
          type: "Error",
          timeOut: "3000",
        })
      );
  }, [error, dispatch]);
  useEffect(() => {
    if (success) {
      dispatch(
        addNotification({
          message: "User Created",
          type: "Success",
          timeOut: 3000,
        })
      );
      dispatch(addSettingsForNewUser());
      dispatch(refreshState());
      navigate("/signIn");
    }
  }, [success, dispatch, navigate]);

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

  function onSignInClick() {
    navigate("/signIn");
  }
  let classname = darkmode ? "theme-dark" : "theme-light";
  return (
    <>
      <div className={`${classname} custom-fonts App uniform-colors`}>
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
              <Form />
              <div className="sign-up-card-label-body">
                <label className="sign-up-end-label">
                  Already a member? <span onClick={onSignInClick}>SignIn</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
