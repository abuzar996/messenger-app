export const validateForm = (values) => {
  let errors = [];

  if (!values.email) {
    errors.email = "Email is Required";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email
    )
  ) {
    errors.email = "Invalid Email format";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 6) {
    errors.password = "Short length password";
  }
  return errors;
};

export const signInForm = {
  email: "",
  password: "",
};

export const NormalizeErrors = (errors) => {
  return Object.values(errors);
};
export const getErrors = (errors) => {
  let arr = Object.keys(errors);
  let errorTypes = arr.map((error) => error.toLowerCase());
  return errorTypes;
};
