const Joi = require("joi");
const changeUserSettingsSchema = Joi.object({
  userId: Joi.number().required(),
});

module.exports = { changeUserSettingsSchema: changeUserSettingsSchema };
