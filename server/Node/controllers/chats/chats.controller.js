const {
  returnChatData,
  fetchMessages,
} = require("../../services/chats.services");

const fetchMessagesData = (req, res) => {
  const { userId } = req.params;
  const { user } = req.body;
  try {
    let messageData = fetchMessages(user.userId, userId);
    if (messageData && messageData.length > 0) {
      res.status(200).send({ messageData });
    } else {
      res.status(404).send({ messageData: [] });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

const getChatData = (req, res) => {
  const { userId } = req.params;
  try {
    const list = returnChatData(+userId);
    res.status(200).send(list.chats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getChatData: getChatData, fetchMessagesData };
