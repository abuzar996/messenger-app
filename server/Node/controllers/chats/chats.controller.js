const {
  checkIfChatsExist: getChatList,
} = require("../../services/chats.services");
const getChatData = (req, res) => {
  const { userId } = req.params;
  try {
    const list = getChatList(+userId);
    res.status(200).send(list.chatListData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getChatData: getChatData };
