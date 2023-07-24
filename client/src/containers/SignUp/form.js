import React, { useState } from "react";
import "./signUp.styles.css";
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/slices/notificationSlice";
import { useFormik } from "formik";
import { loginUser as signIn } from "../../redux/slices/authSlice.js";
import useErrors from "./useErrors.js";
import {
  initialValues,
  validateForm,
  NormalizeErrors,
  getErrors,
} from "./formik";
const Form = () => {
  let dispatch = useDispatch();
  const [errorList, setErrorList] = useState(null);
  const {
    firstnameError,
    lastnameError,
    emailError,
    passwordError,
    confirmPasswordError,
  } = useErrors(errorList);

  const loginUser = () => {
    dispatch(
      addNotification({
        message: "Login Successful",
        type: "Success",
        timeOut: 5000,
      })
    );
    dispatch(signIn());
  };
  const submitForm = (values) => {
    let errors = validateForm(values);
    let errorData;
    if (errors) {
      errorData = NormalizeErrors(errors);
      let listErrors = getErrors(errors);
      if (listErrors.length > 0) {
        setErrorList(listErrors);
      } else {
        setErrorList(null);
      }
      if (errorData.length > 0) {
        errorData.forEach((error) =>
          dispatch(
            addNotification({
              message: error,
              type: "Error",
              timeOut: 5000,
            })
          )
        );
        return;
      } else {
        //console.log("hello world");
        loginUser();
      }
      return;
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit: submitForm,
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="sign-up-card-body-child">
        <input
          className="sign-up-card-body-child-input"
          style={firstnameError ? { borderBottom: "2px solid red" } : null}
          placeholder="First Name"
          type="text"
          name="firstname"
          value={formik.values.firstname}
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div className="sign-up-card-body-child">
        <input
          className="sign-up-card-body-child-input"
          style={lastnameError ? { borderBottom: "2px solid red" } : null}
          placeholder="Last Name"
          type="text"
          autoComplete="off"
          name="lastname"
          value={formik.values.lastname}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div className="sign-up-card-body-child">
        <input
          className="sign-up-card-body-child-input"
          style={emailError ? { borderBottom: "2px solid red" } : null}
          placeholder="Email"
          type="text"
          autoComplete="off"
          value={formik.values.email}
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div className="sign-up-card-body-child">
        <input
          className="sign-up-card-body-child-input"
          style={passwordError ? { borderBottom: "2px solid red" } : null}
          placeholder="Password"
          type="password"
          autoComplete="off"
          name="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div className="sign-up-card-body-child">
        <input
          className="sign-up-card-body-child-input"
          style={
            confirmPasswordError ? { borderBottom: "2px solid red" } : null
          }
          placeholder="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          autoComplete="off"
          name="confirmPassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>
      <div className="sign-up-card-button-body">
        <button
          className="sign-up-close-button"
          type="reset"
          onClick={formik.resetForm}
        >
          Cancel
        </button>
        <button className="sign-up-button" type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default Form;
