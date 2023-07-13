export const chats = [
  {
    user1: "hello",
    messageId: 1,
  },
  {
    user1: "how are you",
    messageId: 2,
  },
  {
    user2: "I'm good",
    messageId: 3,
  },
  {
    user1: "Great!",
    messageId: 4,
  },
  {
    user1: "hello",
    messageId: 5,
  },
  {
    user2: "hello",
    messageId: 6,
  },
  {
    user1: "Great!",
    messageId: 7,
  },
  {
    user1: "Great!",
    messageId: 8,
  },
  {
    user1: "hello",
    messageId: 9,
  },
  {
    user2: "hell jdnjkd jdnjko",
    messageId: 10,
  },
  {
    user1: "jefjenfjekdbcu ",
    messageId: 11,
  },
  {
    user2: "I",
    messageId: 12,
  },
  {
    user2:
      "jefjenfjekdbcu duyrfher yg egyf egbfed jhed gehdbnchd chjklcbhjkhbrbfrh hbrfnhjbfhjekb hbrjbferbfhjrfbh hjbfrbfrhf hI",
    messageId: 13,
  },
  {
    user1: "I'm good",
    messageId: 14,
    reply: 10,
  },
  {
    user2: "I'm good",
    messageId: 15,
    reply: 10,
  },
];
export const searchList = ["Alex", "John", "Ketty", "Justin"];

export const data = [
  {
    userId: 1,
    firstname: "Abuzar",
    lastname: "Rahim",
    lastMessage: {
      user1: "I'm good",
      messageId: 15,
      reply: 10,
      opened: false,
    },
  },
  {
    userId: 2,
    firstname: "Alex",
    lastname: "Phill",
    lastMessage: {
      user1: "I'm good",
      messageId: 15,
      reply: 10,
      opened: true,
    },
  },
  {
    userId: 3,
    firstname: "Jhon",
    lastname: "Doe",
    lastMessage: {
      user2: "I'm good",
      messageId: 15,
      reply: 10,
      opened: true,
    },
  },
  {
    userId: 4,
    firstname: "Alpha",
    lastname: "Doe",
    lastMessage: {
      user2: "I'm good",
      messageId: 15,
      reply: 10,
      opened: false,
    },
  },
  {
    userId: 5,
    firstname: "Abuzar",
    lastname: "Doe",
    lastMessage: {
      user1: "I'm good",
      messageId: 15,
      reply: 10,
      opened: false,
    },
  },
  {
    userId: 6,
    firstname: "Alex",
    lastname: "Doe",
    lastMessage: {
      user2: "I'm good",
      messageId: 15,
      reply: 10,
      opened: false,
    },
  },
  {
    userId: 7,
    firstname: "Jhon",
    lastname: "Doe",
    lastMessage: {
      user2: "I'm good",
      messageId: 15,
      reply: 10,
      opened: false,
    },
  },
  {
    userId: 8,
    firstname: "Alpha",
    lastname: "Doe",
    lastMessage: {
      user2: "I'm good",
      messageId: 15,
      reply: 10,
      opened: false,
    },
  },
  {
    userId: 9,
    firstname: "Abuzar",
    lastname: "Doe",
    lastMessage: {
      user2: "I'm good",
      messageId: 15,
      reply: 10,
      opened: false,
    },
  },
  {
    userId: 10,
    firstname: "Alex",
    lastname: "Doe",
    lastMessage: {
      user2: "I'm good",
      messageId: 15,
      reply: 10,
      opened: false,
    },
  },
  {
    userId: 11,
    firstname: "Jhon",
    lastname: "Doe",
    lastMessage: {
      user2: "I'm good",
      messageId: 15,
      reply: 10,
      opened: false,
    },
  },
  {
    userId: 12,
    firstname: "Alpha",
    lastname: "Doe",
    lastMessage: {
      user2: "I'm good",
      messageId: 15,
      reply: 10,
      opened: false,
    },
  },
];
export const updateData = (id) => {
  return (data[id].lastMessage.opened = true);
};
