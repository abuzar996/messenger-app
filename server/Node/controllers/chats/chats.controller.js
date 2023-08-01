const { returnChatData } = require("../../services/chats.services");
const getChatData = (req, res) => {
  const { userId } = req.params;
  try {
    const list = returnChatData(+userId);
    res.status(200).send(list.chats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getChatData: getChatData };
