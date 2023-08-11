const Joi = require("joi");
const fetchMessagesSchema = Joi.object({
  userId: Joi.string().required(),
});

const addMessageSchema = Joi.object({
  message: Joi.number().required(),
  data: Joi.object({
    messageId: Joi.string().required(),
    message: Joi.string().required(),
    sender: Joi.string().required(),
    reply: Joi.optional(),
    opened: Joi.boolean().optional(),
    senderId: Joi.optional(),
  }).required(),
});

const setMessageSeenSchema = Joi.object({
  messageId: Joi.required(),
  owner: Joi.required(),
});

const addMessageRecordSchema = Joi.object({
  data: Joi.object({
    messageId: Joi.string().required(),
    message: Joi.string().required(),
    sender: Joi.string().required(),
    reply: Joi.optional(),
    senderId: Joi.optional(),
    opened: Joi.optional(),
  }).required(),
});
const createNewChatSchema = Joi.object({
  userId: Joi.number().required(),
  clientId: Joi.number().required(),
  message: Joi.number().required(),
});
const deleteSelectedChatSchema = Joi.object({
  recordId: Joi.number().required(),
  messageId: Joi.string().required(),
});

const deleteChatRecordSchema = Joi.object({
  userId: Joi.number().required(),
  clientId: Joi.number().required(),
});

const changeChatFavouriteSchema = Joi.object({
  userId: Joi.required(),
  chatId: Joi.required(),
});
module.exports = {
  fetchMessagesSchema,
  addMessageSchema,
  addMessageRecordSchema,
  createNewChatSchema,
  deleteSelectedChatSchema,
  deleteChatRecordSchema,
  changeChatFavouriteSchema,
  setMessageSeenSchema,
};
