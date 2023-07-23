import { useState, useEffect } from "react";

const useErrors = (errorList) => {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (errorList) {
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
    } else {
      setEmailError(false);
      setPasswordError(false);
    }
  }, [errorList]);
  return { emailError, passwordError };
};

export default useErrors;
