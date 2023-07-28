const path = require("path");
const cors = require("cors");
const express = require("express");
const userRouter = require("./Node/routes/user/user.routes");
const chatsRouter = require("./Node/routes/chats/chats.routes");
require("dotenv").config();
const app = express();
//const origin = ["http://localhost/3000"];
app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, "..", "server", "public")));
app.use(express.json());

app.use("/users", userRouter);
app.use("/chats", chatsRouter);
app.get("*/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "server", "public", "index.html"));
});

module.exports = app;
