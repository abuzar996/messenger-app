import React, { useEffect, useState } from "react";
import "./signIn.styles.css";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { validateForm, submitForm, signInForm } from "./formik";
import Notification from "../../components/Notifications";
const Form = () => {
  const [submitClicked, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [notification, setNotification] = useState(null);
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
      console.log(message);
      toast.success(message);
    }
  }, [formik.errors]);
  return (
    <>
      <div style={{ position: "fixed" }}>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
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
            onClick={formik.resetForm}
          >
            Cancel
          </button>
          <button
            className="sign-in-button"
            type="submit"
            onClick={() => {
              setSubmitted(true);
            }}
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
