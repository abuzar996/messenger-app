const express = require("express");
const chatsRouter = express.Router();

const { isAuthenticated } = require("../../middlewares/user.middlewares");
const { getChatData } = require("../../controllers/chats/chats.controller");
const { userCheck, chatCheck } = require("../../middlewares/chats.middlewares");
chatsRouter.get(
  "/get-chat-list-by-id/:userId",
  isAuthenticated,
  userCheck,
  chatCheck,
  getChatData
);
module.exports = chatsRouter;
