const { verifyUser } = require("./user.services");
const { chats, chatsData, messageData } = require("../modal/chats/chats.modal");
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
        return data.data;
      }

      return [];
    }
    return [];

    //let messages=messageData.find(({message}) =>message===userId);
  } else {
    return [];
  }
};
module.exports = {
  checkIfSameUser: checkIfSameUser,
  checkIfChatsExist: checkIfChatsExist,
  returnChatData: returnChatData,
  fetchMessages,
};
