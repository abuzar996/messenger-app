import { useState, useEffect } from "react";
import axios from "axios";
const useStatus = () => {
  const [isServerReachable, setServerReachable] = useState(false);
  const checkServerStatus = async () => {
    await axios
      .get("http://localhost:3001")
      .then((response) => {
        if (response.status === 200) {
          setServerReachable(true);
        }
      })
      .catch(() => {
        console.log("hello");
        setServerReachable(false);
      });
  };
  useEffect(() => {
    checkServerStatus();
  });
  return isServerReachable;
};

export default useStatus;
