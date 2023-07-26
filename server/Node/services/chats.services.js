const { verifyUser } = require("./user.services");
const { chats } = require("../modal/chats/chats.modal");
const checkIfSameUser = (userId, token) => {
  const userData = verifyUser(token);
  if (userData && userData.userId) {
    return +userId === userData.userId ? true : false;
  }
  return false;
};

const checkIfChatsExist = (userId) => {
  return chats.find((chat) => chat.userId === userId);
};

module.exports = {
  checkIfSameUser: checkIfSameUser,
  checkIfChatsExist: checkIfChatsExist,
};
