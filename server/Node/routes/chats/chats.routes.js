const express = require("express");
const chatsRouter = express.Router();

const { isAuthenticated } = require("../../middlewares/user.middlewares");
const {
  getChatData,
  fetchMessagesData,
  addNewMessage,
  addNewMessageRecord,
  addNewChatToList,
  deleteSelectedChat,
  deleteChatRecord,
  changeFavouriteChatsForUser,
} = require("../../controllers/chats/chats.controller");
const {
  userCheck,
  chatCheck,
  validatefetchMessages,
  validateAddMessage,
  validateAddMessageRecord,
  validateAddChat,
  validatedeleteChat,
  validatedeleteChatRecord,
  validateChangeChatFavourites,
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

chatsRouter.post(
  "/add-new-message",
  isAuthenticated,
  validateAddMessage,
  addNewMessage
);

chatsRouter.post(
  "/add-new-message-record",
  isAuthenticated,
  validateAddMessageRecord,
  addNewMessageRecord
);

chatsRouter.post(
  "/add-new-chat-to-list",
  isAuthenticated,
  validateAddChat,
  addNewChatToList
);
chatsRouter.post(
  "/delete-selected-chat",
  isAuthenticated,
  validatedeleteChat,
  deleteSelectedChat
);

chatsRouter.post(
  "/delete-chat-record",
  isAuthenticated,
  validatedeleteChatRecord,
  deleteChatRecord
);

chatsRouter.post(
  "/change-favourites",
  isAuthenticated,
  validateChangeChatFavourites,
  changeFavouriteChatsForUser
);

module.exports = chatsRouter;
