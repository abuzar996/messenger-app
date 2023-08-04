const {
  changeUserSettingsSchema,
} = require("../validators/settings.validators");
const validatechangeUserSettings = async (req, res, next) => {
  const { userId } = req.body;
  try {
    await changeUserSettingsSchema.validateAsync({ userId });
    next();
  } catch (err) {
    res.status(409).send({ message: err.message });
  }
};
module.exports = { validatechangeUserSettings: validatechangeUserSettings };
