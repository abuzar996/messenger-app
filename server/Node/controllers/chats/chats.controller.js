const {
  returnChatData,
  fetchMessages,
  findMessageRecord,
  addMessageToRecord,
  createNewRecord,
  addmessageRecordToUser,
  addmessageRecordToClient,
  findAndDeleteMessage,
  findAndDeleteRecord,
  findAndChangeFav,
  updateLastMessageStatus,
} = require("../../services/chats.services");
let { messageData } = require("../../modal/chats/chats.modal");
const { user } = require("../../modal/user/user.modal");
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

const deleteSelectedChat = (req, res) => {
  const { recordId, messageId } = req.body;
  try {
    const findAndDelete = findAndDeleteMessage(recordId, messageId);
    if (findAndDelete) {
      res.status(200).send({ message: "Message deleted successfully" });
    } else {
      res.status(404).send({ message: "Couldn't find" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteChatRecord = (req, res) => {
  const { userId, clientId } = req.body;
  try {
    let data = findAndDeleteRecord(userId, clientId);
    if (data) {
      return res.status(200).send({ message: "Record Deleted successfully!" });
    }
    return res.status(404).send({ message: "Something went wrong" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const changeFavouriteChatsForUser = (req, res) => {
  const { userId, chatId } = req.body;
  try {
    const changeFav = findAndChangeFav(userId, chatId);
    if (changeFav) {
      return res.status(200).send({ message: "Status changed successfully" });
    }
    return res.status(404).send({ message: "Something went wrong" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const updateMessageStatus = (req, res) => {
  const { messageId, owner } = req.body;
  try {
    const update = updateLastMessageStatus(owner, messageId);
    if (update) {
      return res.status(200).send({
        message: "Message Updated successfully",
      });
    }
    return res.status(404).send({ message: "Something went wrong!" });
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
  deleteSelectedChat,
  deleteChatRecord,
  changeFavouriteChatsForUser,
  updateMessageStatus,
};
