import React from "react";
import "./signIn.styles.css";
import "../../App.css";

import { useFormik } from "formik";
import { validateForm, submitForm, signInForm } from "./formik";
const Form = () => {
  const formik = useFormik({
    initialValues: signInForm,
    onSubmit: submitForm,
    validate: validateForm,
  });
  return (
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
        <button className="sign-in-button" type="submit">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default Form;
