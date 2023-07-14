const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const userRouter = require("./Node/routes/user/user.routes");
app.use("/users", userRouter);

module.exports = app;
