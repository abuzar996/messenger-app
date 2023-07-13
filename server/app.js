const express = require("express");
require("dotenv").config();
const app = express();
const userRouter = require("./Node/routes/user/user.routes");
app.use("/users", userRouter);
app.get("/get", (req, res) => {
  res.send({
    message: "hello my world",
  });
});

module.exports = app;
