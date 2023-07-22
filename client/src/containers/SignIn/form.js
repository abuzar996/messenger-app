import React, { useEffect, useState } from "react";
import "./signIn.styles.css";
import "../../App.css";
//import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { validateForm, submitForm, signInForm } from "./formik";
//import Notification from "../../components/Notifications";
//import { notificationManager } from "../../components/Notifications";
//import { changeNotify } from "../../redux/slices/appSettingSlice";
import { addNotification } from "../../redux/slices/notificationSlice";
const Form = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  //   const [submitClicked, setSubmitted] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [notification, setNotification] = useState(null);
  const formik = useFormik({
    initialValues: signInForm,

    validate: validateForm,
    onSubmit: submitForm,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnSubmit: true,
  });

  useEffect(() => {
    let errorMessage = Object.keys(formik.errors)[0];
    let message = errorMessage ? formik.errors[errorMessage] : null;
    if (message && !error) {
      if (!error) {
        //  setCount(count + 1);
        // notificationManager.error(message, "error", 5000);
      }
      setError(true);
      //console.log(message);
      // toast.success(message);
      //
    }
  }, [formik.errors, error]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
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
              //dispatch(changeNotify());
              //notificationManager.error("message", "error", 3000);
              dispatch(
                addNotification({
                  message: "hello",
                  type: "error",
                  timeOut: 3000,
                })
              );
            }}
          >
            Cancel
          </button>
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
