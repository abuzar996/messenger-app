const express = require("express");
const {
  createNewUser,
  loginUser,
  searchUserById,
  getAllUsers,
} = require("../../controllers/user/user.controller.js");
const {
  userExists,
  validateUserRequestBody,
  validateLoginRequestBody,
  userDoesNotExists,
  isAuthenticated,
} = require("../../middlewares/user.middlewares.js");
const userRouter = express.Router();

userRouter.get("/", isAuthenticated, getAllUsers);

userRouter.get("/:userId", isAuthenticated, searchUserById);
// userRouter.get(
//   "/get-user-by-email/:email",
//   checkEmailRequest,
//   userController.searchAUserByEmail
// );
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
  loginUser
);
module.exports = userRouter;
