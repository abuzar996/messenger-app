const path = require("path");
const cors = require("cors");
const express = require("express");
const userRouter = require("./Node/routes/user/user.routes");
const chatsRouter = require("./Node/routes/chats/chats.routes");
const settingsRouter = require("./Node/routes/settings/settings.routes");
require("dotenv").config();
const app = express();

app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, "..", "server", "public")));
app.use(express.json());

app.use("/users", userRouter);
app.use("/chats", chatsRouter);
app.use("/settings", settingsRouter);
app.get("*/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "server", "public", "index.html"));
});

module.exports = app;
