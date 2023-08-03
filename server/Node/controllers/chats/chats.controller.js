const {
  returnChatData,
  fetchMessages,
  findMessageRecord,
  addMessageToRecord,
  createNewRecord,
  addmessageRecordToUser,
  addmessageRecordToClient,
} = require("../../services/chats.services");
const { messageData, chatsData } = require("../../modal/chats/chats.modal");
const fetchMessagesData = (req, res) => {
  const { userId } = req.params;
  const { user } = req.body;
  try {
    let messageData = fetchMessages(user.userId, userId);
    if (messageData.data && messageData.data.length > 0) {
      res
        .status(200)
        .send({ messageData: messageData.data, message: messageData.message });
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

const addNewMessage = (req, res) => {
  const { message, data } = req.body;
  try {
    let messageRecord = findMessageRecord(message);
    if (messageRecord) {
      let record = addMessageToRecord(message, messageRecord, data);
      if (record) {
        res.status(200).send(messageData);
      } else {
        res.status(500).send("Something went wrong");
      }
    } else {
      res.status(404).send({ message: "no record" });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

const addNewMessageRecord = (req, res) => {
  const { data } = req.body;
  try {
    const result = createNewRecord(data);
    if (result !== -1) {
      res.status(200).send({ result: result });
    } else {
      res.status(500).send({ message: "Something went wrong" });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
};

const addNewChatToList = (req, res) => {
  const { userId, clientId, message } = req.body;
  try {
    let clientToUser = addmessageRecordToUser(userId, clientId, message);
    let userToClient = addmessageRecordToClient(userId, clientId, message);
    if (clientToUser && userToClient) {
      res.status(200).send({ message: "Record Added successfully" });
    } else {
      res.status(500).send({ message: "Something went wrong" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getChatData: getChatData,
  fetchMessagesData,
  addNewMessage,
  addNewMessageRecord,
  addNewChatToList,
};
