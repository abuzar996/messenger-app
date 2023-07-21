import React, { useEffect, useState } from "react";
import "./signIn.styles.css";
import "../../App.css";
//import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { validateForm, submitForm, signInForm } from "./formik";
//import Notification from "../../components/Notifications";
import { notificationManager } from "../../components/Notifications";
import { changeNotify } from "../../redux/slices/appSettingSlice";
const Form = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  //   const [submitClicked, setSubmitted] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [notification, setNotification] = useState(null);
  const formik = useFormik({
    initialValues: signInForm,

    validate: validateForm,
    onSubmit: submitForm,
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    let errorMessage = Object.keys(formik.errors)[0];
    let message = errorMessage ? formik.errors[errorMessage] : null;
    if (message) {
      //console.log(message);
      // toast.success(message);
      //
    }
  }, [formik.errors]);
  function onClick(e) {
    //  console.log("hello world");
    dispatch(changeNotify());
    setCount(count + 1);
    notificationManager.success(count, "success", 5000);
    e.preventDefault();
  }
  return (
    <>
      <form /*onSubmit={formik.handleSubmit}*/>
        <div className="sign-in-card-body-child">
          <input
            style={
              formik.touched.email && formik.errors.email
                ? { borderBottom: "2px solid red" }
                : null
            }
            placeholder="Email"
            type="text"
            autoComplete="off"
            value={formik.values.email}
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div className="sign-in-card-body-child">
          <input
            style={
              formik.touched.password && formik.errors.password
                ? { borderBottom: "2px solid red" }
                : null
            }
            placeholder="Password"
            type="password"
            autoComplete="off"
            value={formik.values.password}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <div className="sign-in-card-button-body">
          <button
            className="sign-in-close-button"
            type="reset"
            //onClick={formik.resetForm}
            onClick={() => {
              dispatch(changeNotify());
              notificationManager.error("message", "error", 3000);
            }}
          >
            Cancel
          </button>
          <button
            className="sign-in-button" /*type="submit"*/
            onClick={onClick}
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
