const { verifyUser } = require("./user.services");
const { chats, chatsData } = require("../modal/chats/chats.modal");
const checkIfSameUser = (userId, token) => {
  const userData = verifyUser(token);
  if (userData && userData.userId) {
    return +userId === userData.userId ? true : false;
  }
  return false;
};

const checkIfChatsExist = (userId) => {
  return chatsData.find((chat) => chat.userId === userId);
};

module.exports = {
  checkIfSameUser: checkIfSameUser,
  checkIfChatsExist: checkIfChatsExist,
};
