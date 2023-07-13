const express = require("express");
const userController = require("../../controllers/user/user.controller.js");
const { checkEmailRequest } = require("../../middlewares/user.middlewares.js");
const userRouter = express.Router();

userRouter.get("/", userController.getUsers);

module.exports = userRouter;
