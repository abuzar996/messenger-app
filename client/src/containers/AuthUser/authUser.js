import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const AuthUser = ({ children }) => {
  useEffect(() => {
    if (document.fullscreenEnabled) {
      console.log("hello");
    }
  }, []);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signIn");
    } else {
      //navigate("/home");
    }
  }, [navigate, isAuthenticated]);

  return <div>{isAuthenticated && <div> {children} </div>}</div>;
};

export default AuthUser;
