export const validateForm = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email
    )
  ) {
    errors.email = "Invalid Email format";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "short password";
  }
  return errors;
};

export const submitForm = (values) => {
  console.log("on submit Clicked");
  console.log("values", values);
};

export const signInForm = {
  email: "",
  password: "",
};
