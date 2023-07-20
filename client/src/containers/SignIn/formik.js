export const validateForm = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is Required";
    return errors;
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email
    )
  ) {
    errors.email = "Invalid Email format";
    return errors;
  }
  if (!values.password) {
    errors.password = "Password is Required";
    return errors;
  } else if (values.password.length < 6) {
    errors.password = "Short length password";
    return errors;
  }
  return errors;
};

export const submitForm = (values, { validate }) => {
  validate && validate(values);

  console.log("on submit Clicked");
  console.log("values", values);
};

export const signInForm = {
  email: "",
  password: "",
};
