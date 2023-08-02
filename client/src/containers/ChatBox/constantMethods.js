export const setHorizontalDisplay = (xValue, parentWidth, clientWidth) => {
  if (xValue + clientWidth > parentWidth) {
    localStorage.setItem("xAxis", xValue - clientWidth + 30);
  } else if (xValue + clientWidth < parentWidth) {
    localStorage.setItem("xAxis", xValue);
  }
};

export const setVerticalDisplay = (yValue, parentHeight, clientHeight) => {
  if (yValue + clientHeight > parentHeight) {
    localStorage.setItem("yAxis", yValue - clientHeight + 18);
    return;
  }

  localStorage.setItem("yAxis", yValue);
};
