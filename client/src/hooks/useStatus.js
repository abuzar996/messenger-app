import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../constants/data";
const useStatus = () => {
  const [isServerReachable, setServerReachable] = useState(false);
  const checkServerStatus = async () => {
    await axios
      .get(`${API}`)
      .then((response) => {
        if (response.status === 200) {
          setServerReachable(true);
        }
      })
      .catch(() => {
        setServerReachable(false);
      });
  };
  useEffect(() => {
    checkServerStatus();
  });
  return isServerReachable;
};

export default useStatus;
