import React, { useState, useRef, useEffect } from "react";
import Form from "./form";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Notifications/notificationContainer";
import "./signIn.styles.css";
import "../../App.css";

//import { EventEmmiter } from "events";
//import { loginUser } from "../../redux/slices/authSlice";
//import { useDispatch, useSelector } from "react-redux";
import { useDimentions } from "../../hooks/useDimentions";

const SignIn = () => {
  const isAuthenticated = false;
  // const isAuthenticated = useSelector(
  //   (state) => state.authReducer.isAuthenticated
  // );
  //const dispatch = useDispatch();
  //const [isAuthenticated] = useState(false);
  const navigate = useNavigate();
  const windowSize = useDimentions();
  const pageRef = useRef(null);
  const modalRef = useRef(null);
  const [topVal, setTopVal] = useState(null);
  const [leftVal, setLeftVal] = useState(null);
  // useEffect(() => {
  //   console.log("signIn Rerender");
  // });
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

  // dispatch(
  //   loginUser({
  //     email: "allison@gmail.com",
  //     password: "123456",
  //   })
  // );

  function onSignUpClick() {
    navigate("/signup");
  }

  return (
    <>
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

      <Notification />
    </>
  );
};

export default SignIn;
