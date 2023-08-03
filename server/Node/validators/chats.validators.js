const Joi = require("joi");
const fetchMessagesSchema = Joi.object({
  userId: Joi.string().required(),
});

const addMessageSchema = Joi.object({
  message: Joi.number().required(),
  data: Joi.object({
    messageId: Joi.number().required(),
    message: Joi.string().required(),
    sender: Joi.string().required(),
    reply: Joi.number().optional(),
  }).required(),
});
const addMessageRecordSchema = Joi.object({
  data: Joi.object({
    messageId: Joi.number().required(),
    message: Joi.string().required(),
    sender: Joi.string().required(),
    reply: Joi.number().optional(),
  }).required(),
});
const createNewChatSchema = Joi.object({
  userId: Joi.number().required(),
  clientId: Joi.number().required(),
  message: Joi.number().required(),
});
module.exports = {
  fetchMessagesSchema,
  addMessageSchema,
  addMessageRecordSchema,
  createNewChatSchema,
};
