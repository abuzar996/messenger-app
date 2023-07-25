const path = require("path");
const cors = require("cors");
const express = require("express");
const userRouter = require("./Node/routes/user/user.routes");
require("dotenv").config();
const app = express();

app.use(cors({ origin: "http://localhost/3000" }));
app.use(express.static(path.join(__dirname, "..", "server", "public")));
app.use(express.json());
app.get("/app/connect", (req, res) => {
  res.status(200).send("ok");
});
app.use("/users", userRouter);
app.get("*/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "server", "public", "index.html"));
});

module.exports = app;
