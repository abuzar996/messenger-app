import { useEffect } from "react";

export const useKeys = (key, fun) => {
  function keyDown(event) {
    if (event.key === key) {
      fun();
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  });
};
