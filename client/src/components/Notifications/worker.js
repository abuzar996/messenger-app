console.log("This is worker file");
onmessage = (event) => {
  if (event.data === "start") {
    // Call your time-based function here
    //    scheduleTimeBasedFunction();
  }
};
