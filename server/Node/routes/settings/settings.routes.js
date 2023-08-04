const express = require("express");
const settingsRouter = express.Router();
const { isAuthenticated } = require("../../middlewares/user.middlewares");
const {
  validatechangeUserSettings,
} = require("../../middlewares/settings.middlewares");
const {
  getUserSettings,
  changeUserSettings,
  addNewSettingsforUser,
} = require("../../controllers/settings/settings.controller");
settingsRouter.get(
  "/get-settings-of-user/:userId",
  isAuthenticated,
  getUserSettings
);
settingsRouter.post(
  "/change-settings-of-user",
  isAuthenticated,
  validatechangeUserSettings,
  changeUserSettings
);

settingsRouter.post("/add-new-user-settings", addNewSettingsforUser);

module.exports = settingsRouter;
