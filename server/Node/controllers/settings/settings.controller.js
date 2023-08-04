const { settings } = require("../../modal/settings/settings.modal");
const {
  findSettingsById,
  changeUserSettingsById,
  addNewSettings,
} = require("../../services/settings.services");
const getUserSettings = (req, res) => {
  const { userId } = req.params;
  try {
    let settings = findSettingsById(+userId);
    if (settings) {
      return res.status(200).send(settings);
    }
    return res.status(400).send({});
  } catch (err) {
    res.send({ message: err.message });
  }
};
const changeUserSettings = (req, res) => {
  const { userId } = req.body;
  try {
    let changeSettings = changeUserSettingsById(userId);
    if (changeSettings) {
      return res.status(200).send({ message: "Changes done successfully!" });
    }
    return res.status(400).send({ message: "Changes failed!" });
  } catch (err) {
    res.send({ message: err.message });
  }
};
const addNewSettingsforUser = (req, res) => {
  try {
    let newSettings = addNewSettings();
    if (newSettings) {
      return res
        .status(200)
        .send({ message: "Settings updated successfully!" });
    }
    return res.status(400).send({ message: "Something went Wrong!" });
  } catch (err) {
    res.send({ message: err.message });
  }
};
module.exports = {
  getUserSettings: getUserSettings,
  changeUserSettings: changeUserSettings,
  addNewSettingsforUser: addNewSettingsforUser,
};
