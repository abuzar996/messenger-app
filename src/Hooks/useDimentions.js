import { useState, useEffect } from "react";

export const useDimentions = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  function reRenderComponent() {
    setWindowSize((state) => {
      return {
        ...state,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    });
  }
  useEffect(() => {
    window.addEventListener("resize", reRenderComponent);
    return () => {
      window.removeEventListener("resize", reRenderComponent);
    };
  }, [windowSize]);
  return windowSize;
};
