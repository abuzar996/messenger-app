import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthUser = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(true);
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
