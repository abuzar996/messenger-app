const {
  checkIfSameUser,
  checkIfChatsExist,
} = require("../services/chats.services");
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
module.exports = { userCheck, chatCheck };
