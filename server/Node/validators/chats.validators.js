const Joi = require("joi");
const fetchMessagesSchema = Joi.object({
  userId: Joi.string().required(),
});
module.exports = {
  fetchMessagesSchema,
};
