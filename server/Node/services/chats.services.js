const { verifyUser } = require("./user.services");
let { chatsData, messageData } = require("../modal/chats/chats.modal");
const updateLastMessageStatus = (owner, messageId) => {
  try {
    let data = messageData.find((message) => message.message === messageId);

    if (data) {
      let lastMessage = data.data[data.data.length - 1];
      if ("opened" in lastMessage);
      {
        if (owner !== lastMessage.sender) {
          if (lastMessage.opened === false) {
            lastMessage.opened = true;
            return true;
          }
          return true;
        }
        return false;
      }
    }
    return false;
  } catch {
    return false;
  }
};
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

const returnChatData = (userId) => {
  let data = chatsData.find((chat) => chat.userId === userId);
  let chatIds = data.chats.map((chats) => chats.messages);
  let lastMessage = chatIds.map((chatId) => {
    let data = messageData.find((message) => message.message === chatId);
    return data.data.slice(-1)[0];
  });
  data.chats = data.chats.map((chat, index) => {
    return { ...chat, lastMessage: lastMessage[index] };
  });
  return data;
};
const fetchMessages = (searcher, userId) => {
  if (searcher && userId) {
    let history = chatsData.find((chat) => chat.userId === searcher);
    let chat = history.chats.find((chat) => chat.userId === +userId);
    if (chat) {
      let data = messageData.find(
        (message) => message.message === chat.messages
      );
      if (data) {
        return data;
      }

      return [];
    }
    return [];
  } else {
    return [];
  }
};

const findMessageRecord = (message) => {
  let data = messageData.find((data) => data.message === message).data;
  return data;
};
const addMessageToRecord = (message, messageRecord, data) => {
  try {
    messageRecord.push(data);
    let newState = messageData.map((data) => {
      if (data.message === message) {
        data.data = messageRecord;
      }
      return data;
    });
    messageData = newState;
    return true;
  } catch (err) {
    return false;
  }
};

const createNewRecord = (data) => {
  try {
    let newRecord = {
      message: messageData.length + 1,
      data: [data],
    };
    messageData.push(newRecord);
    return messageData.length;
  } catch (err) {
    return -1;
  }
};
const addmessageRecordToUser = (userId, clientId, message) => {
  try {
    let userData = chatsData.find((chat) => chat.userId === userId);
    if (userData) {
      userData.chats.push({ userId: clientId, messages: message });
    } else {
      let array = [];
      array.push({ userId: clientId, messages: message });
      let tempObj = {
        userId: userId,
        chats: array,
      };
      chatsData.push(tempObj);
    }
    return true;
  } catch (err) {
    return false;
  }
};
const addmessageRecordToClient = (userId, clientId, message) => {
  try {
    let clientData = chatsData.find((chat) => chat.userId === clientId);
    if (clientData) {
      clientData.chats.push({ userId: userId, messages: message });
    } else {
      let array = [];
      array.push({ userId: userId, messages: message });
      let tempObj = {
        userId: clientId,
        chats: array,
      };
      chatsData.push(tempObj);
    }
    return true;
  } catch (err) {
    return false;
  }
};
const findAndDeleteMessage = (recordID, messageId) => {
  try {
    const record = messageData.find((message) => message.message === recordID);
    if (record) {
      let data = record.data.filter(
        (message) => message.messageId !== messageId
      );
      if (data.length !== record.data.length) {
        let newData = messageData.map((message) =>
          message.message === recordID
            ? { message: message.message, data: data }
            : { message: message.message, data: message.data }
        );
        //console.log()
        messageData = newData;
        return true;
      } else {
        return false;
      }
    }

    return false;
  } catch {
    return false;
  }
};

const deleteRecordFromUser = (userId, clientId) => {
  try {
    const record = chatsData.find((chat) => chat.userId === userId);
    if (record) {
      const chats = record.chats.find((chat) => chat.userId === clientId);
      if (chats) {
        let newData = record.chats.filter((data) => data.userId !== clientId);
        record.chats = newData;
        return true;
      }
      return false;
    }
    return false;
  } catch {
    return false;
  }
};

const findAndDeleteRecord = (userId, clientId) => {
  try {
    let userDelete = deleteRecordFromUser(userId, clientId);
    if (userDelete) {
      let clientDelete = deleteRecordFromUser(clientId, userId);
      if (clientDelete) {
        return true;
      }
      return false;
    }
    return false;
  } catch {
    return false;
  }

  //  console.log("hello world");
};
const findAndChangeFav = (userId, chatId) => {
  try {
    if (userId && chatId) {
      let record = chatsData.find((chat) => chat.userId === userId);
      if (record) {
        let innerData = record.chats.find((chat) => chat.userId === chatId);
        if (innerData) {
          let fav;
          "favourite" in innerData
            ? (fav = innerData.favourite)
            : (fav = false);

          //let fav = innerData.favourite ? innerData.favourite : false;
          // console.log(fav);
          innerData = {
            userId: innerData.userId,
            messages: innerData.messages,
            favourite: !fav,
          };
          record.chats = record.chats.map((chat) =>
            chat.userId === innerData.userId ? innerData : chat
          );
          chatsData = chatsData.map((chat) =>
            chat.userId === record.userId ? record : chat
          );
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  } catch {
    return false;
  }
};
module.exports = {
  findMessageRecord,
  checkIfSameUser: checkIfSameUser,
  checkIfChatsExist: checkIfChatsExist,
  returnChatData: returnChatData,
  fetchMessages,
  addMessageToRecord,
  createNewRecord,
  addmessageRecordToUser,
  findAndChangeFav,
  addmessageRecordToClient,
  findAndDeleteMessage,
  findAndDeleteRecord,
  updateLastMessageStatus,
};
