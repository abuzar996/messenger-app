const express = require("express");
const {
  createNewUser,
  userlogin,
  searchUserById,
  getAllUsers,
  getUserByName,
  searchAUserByEmail,
} = require("../../controllers/user/user.controller.js");
const {
  userExists,
  validateUserRequestBody,
  validateLoginRequestBody,
  validateSearchUserByName,
  validateSearchUserByEmail,
  validateSearchUserByiD,
  userDoesNotExists,
  isAuthenticated,
} = require("../../middlewares/user.middlewares.js");
const userRouter = express.Router();

userRouter.get("/", isAuthenticated, getAllUsers);

userRouter.get(
  "/:userId",
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
module.exports = userRouter;
