export const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const validateForm = (values) => {
  let errors = [];
  if (!values.firstname) {
    errors.firstname = "Firstname is Required";
  }
  if (!values.lastname) {
    errors.lastname = "Lastname is Required";
  }
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
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Confimation password doesnot match";
  }
  return errors;
};
export const NormalizeErrors = (errors) => {
  return Object.values(errors);
};
export const getErrors = (errors) => {
  let arr = Object.keys(errors);
  let errorTypes = arr.map((error) => error.toLowerCase());
  return errorTypes;
};
