import React, { useState } from "react";
import "./signIn.styles.css";
import "../../App.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { validateForm, signInForm, NormalizeErrors, getErrors } from "./formik";
import { addNotification } from "../../redux/slices/notificationSlice";
import useErrors from "./useErrors";
const Form = () => {
  const dispatch = useDispatch();

  const [errorList, setErrorList] = useState(null);
  const { emailError, passwordError } = useErrors(errorList);

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
        loginUser();
      }
      return;
    }
  };

  const loginUser = () => {
    dispatch(
      addNotification({
        message: "Login Successful",
        type: "Success",
        timeOut: 5000,
      })
    );
  };

  const formik = useFormik({
    initialValues: signInForm,
    onSubmit: submitForm,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="sign-in-card-body-child">
          <input
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
        <div className="sign-in-card-body-child">
          <input
            style={passwordError ? { borderBottom: "2px solid red" } : null}
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
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
