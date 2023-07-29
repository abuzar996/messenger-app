const express = require("express");
const {
  createNewUser,
  userlogin,
  searchUserById,
  getAllUsers,
  getUserByName,
  searchAUserByEmail,
  addUserToFriendList,
  getUserFriends,
  getNonFriends,
} = require("../../controllers/user/user.controller.js");
const {
  userExists,
  validateUserRequestBody,
  validateLoginRequestBody,
  validateSearchUserByName,
  validateSearchUserByEmail,
  validateSearchUserByiD,
  validateAddToFriendList,
  verifyUsersAvailable,
  userDoesNotExists,
  isAuthenticated,
  checkIfNotYourSelf,
} = require("../../middlewares/user.middlewares.js");
const userRouter = express.Router();

userRouter.get("/get-all-users", isAuthenticated, getAllUsers);

userRouter.get(
  "/get-by-id/:userId",
  isAuthenticated,
  validateSearchUserByiD,
  searchUserById
);
userRouter.get(
  "/get-user-by-email/:email",
  isAuthenticated,
  validateSearchUserByEmail,
  searchAUserByEmail
);
userRouter.post(
  "/add-user",
  validateUserRequestBody,
  userExists,
  createNewUser
);
userRouter.post(
  "/login",
  validateLoginRequestBody,
  userDoesNotExists,
  userlogin
);

userRouter.get(
  "/user-by-name/:name",
  isAuthenticated,
  validateSearchUserByName,
  getUserByName
);
userRouter.post(
  "/add-to-friend-list",
  isAuthenticated,
  validateAddToFriendList,
  verifyUsersAvailable,
  checkIfNotYourSelf,
  addUserToFriendList
);

userRouter.get("/get-User-friends", isAuthenticated, getUserFriends);

userRouter.get("/get-non-friends", isAuthenticated, getNonFriends);
module.exports = userRouter;
