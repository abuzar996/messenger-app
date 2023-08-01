const {
  checkIfSameUser,
  checkIfChatsExist,
} = require("../services/chats.services");
const { fetchMessagesSchema } = require("../validators/chats.validators");

const validatefetchMessages = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await fetchMessagesSchema.validateAsync({ userId });
    next();
  } catch (err) {
    res.status(409).send({ message: err.message });
  }
};
const userCheck = (req, res, next) => {
  const { userId } = req.params;
  const { token } = req.headers;
  try {
    const getData = checkIfSameUser(userId, token);
    getData ? next() : res.status(403).send({ message: "Not Allowed" });
  } catch (err) {
    res.send({ message: err });
  }
};

const chatCheck = (req, res, next) => {
  const { userId } = req.params;
  try {
    const chats = checkIfChatsExist(+userId);

    chats ? next() : res.status(404).send({ message: "Not Found" });
  } catch (err) {
    res.send({ message: err.message });
  }
};
module.exports = { userCheck, chatCheck, validatefetchMessages };
