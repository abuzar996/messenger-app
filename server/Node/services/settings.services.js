const { settings } = require("../modal/settings/settings.modal");

const findSettingsById = (userId) => {
  const settingsData = settings.find((setting) => setting.userId == userId);
  if (settingsData) {
    return settingsData;
  }
};
const changeUserSettingsById = (userId) => {
  try {
    let settingsData = settings.find((setting) => setting.userId == userId);
    if (settingsData) {
      settingsData.darkMode = !settingsData.darkMode;
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

const addNewSettings = () => {
  try {
    settings.push({ userId: settings.length + 1, darkMode: false });
    return true;
  } catch {
    return false;
  }
};
module.exports = { findSettingsById, changeUserSettingsById, addNewSettings };
