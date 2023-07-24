import { useState, useEffect } from "react";

const useErrors = (errorList) => {
  const [firstnameError, setFirstnameError] = useState(null);
  const [lastnameError, setLastnameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  useEffect(() => {
    if (errorList) {
      let firstnameError = errorList.find((error) => error === "firstname");
      if (firstnameError) {
        setFirstnameError(true);
      } else {
        setFirstnameError(false);
      }
      let lastnameError = errorList.find((error) => error === "lastname");
      if (lastnameError) {
        setLastnameError(true);
      } else {
        setLastnameError(false);
      }
      let emailError = errorList.find((error) => error === "email");
      if (emailError) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      let passwordError = errorList.find((error) => error === "password");
      if (passwordError) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      let confirmPasswordError = errorList.find(
        (error) => error === "confirmpassword"
      );
      if (confirmPasswordError) {
        setConfirmPasswordError(true);
      } else {
        setConfirmPasswordError(false);
      }
    } else {
      setFirstnameError(false);
      setLastnameError(false);
      setEmailError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);
    }
  }, [errorList]);
  return {
    firstnameError,
    lastnameError,
    emailError,
    passwordError,
    confirmPasswordError,
  };
};

export default useErrors;
