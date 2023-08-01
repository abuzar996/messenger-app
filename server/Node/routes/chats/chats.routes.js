const express = require("express");
const chatsRouter = express.Router();

const { isAuthenticated } = require("../../middlewares/user.middlewares");
const {
  getChatData,
  fetchMessagesData,
} = require("../../controllers/chats/chats.controller");
const {
  userCheck,
  chatCheck,
  validatefetchMessages,
} = require("../../middlewares/chats.middlewares");
chatsRouter.get(
  "/get-chat-list-by-id/:userId",
  isAuthenticated,
  userCheck,
  chatCheck,
  getChatData
);

chatsRouter.get(
  "/fetch-messages-of-user/:userId",
  isAuthenticated,
  validatefetchMessages,
  fetchMessagesData
);
module.exports = chatsRouter;
