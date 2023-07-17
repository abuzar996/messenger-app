const path = require("path");
const express = require("express");
const userRouter = require("./Node/routes/user/user.routes");
require("dotenv").config();
const app = express();

app.use(express.static(path.join(__dirname, "..", "server", "public")));
app.use(express.json());

app.use("/users", userRouter);
app.get("*/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "server", "public", "index.html"));
});
module.exports = app;
