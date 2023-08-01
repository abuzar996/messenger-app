const messageData = [
  {
    message: 1,
    data: [
      {
        sender: "Alex",
        message: "Hello How Are You?",
      },
      {
        sender: "Alex",
        message: "What Are You Doing?",
      },
      {
        sender: "Allison",
        message: "I'm good",
      },
      {
        sender: "Alex",
        message: "Great!",
      },
      {
        sender: "Allison",
        message: "I'm good",
      },
      {
        sender: "Allison",
        message: "Great to Hear!",
      },
    ],
  },
  {
    message: 2,
    data: [
      {
        sender: "Jhon",
        message: "Hello How Are You?",
      },
      {
        sender: "Jhon",
        message: "What Are You Doing?",
      },
      {
        sender: "Allison",
        message: "I'm good",
      },
      {
        sender: "Jhon",
        message: "Great!",
      },
      {
        sender: "Allison",
        message: "I'm good",
      },
      {
        sender: "Jhon",
        message: "Great to Hear!",
      },
    ],
  },
  {
    message: 3,
    data: [
      {
        sender: "Thomas",
        message: "Hello How Are You?",
      },
      {
        sender: "Thomas",
        message: "What Are You Doing?",
      },
      {
        sender: "Allison",
        message: "I'm good",
      },
      {
        sender: "Thomas",
        message: "Great!",
      },
      {
        sender: "Allison",
        message: "I'm good",
      },
      {
        sender: "Thomas",
        message: "Great to Hear!",
      },
    ],
  },
];

const chatsData = [
  {
    userId: 1,
    chats: [
      {
        userId: 2,
        messages: 2,
      },
    ],
  },
  {
    userId: 2,
    chats: [
      {
        userId: 1,
        messages: 2,
      },
    ],
  },
  {
    userId: 4,
    chats: [
      {
        userId: 1,
        messages: 1,
      },
      {
        userId: 2,
        messages: 2,
      },
      {
        userId: 3,
        messages: 3,
      },
    ],
  },
];

const chats = [
  {
    userId: 1,
    chatListData: [
      {
        userId: 1,
        firstname: "Alex",
        lastname: "Phillips",
        lastMessage: {
          user1: "I'm good",
          messageId: 15,
          reply: 10,
          opened: false,
        },
      },
      {
        userId: 2,
        firstname: "John",
        lastname: "Doe",
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
        userId: 14,
        firstname: "Jhon",
        lastname: "Doe",
        lastMessage: {
          user2: "I'm good",
          messageId: 15,
          reply: 10,
          opened: false,
        },
      },
    ],
  },
  {
    userId: 4,
    chatListData: [
      {
        userId: 1,
        firstname: "Alex",
        lastname: "Phillips",
        lastMessage: {
          user1: "I'm good",
          messageId: 15,
          reply: 10,
          opened: false,
        },
      },
      {
        userId: 2,
        firstname: "John",
        lastname: "Doe",
        lastMessage: {
          user1: "I'm good",
          messageId: 15,
          reply: 10,
          opened: true,
        },
      },
      {
        userId: 3,
        firstname: "Thomas",
        lastname: "Snow",
        lastMessage: {
          user2: "I'm good",
          messageId: 15,
          reply: 10,
          opened: true,
        },
      },
      {
        userId: 5,
        firstname: "Kane",
        lastname: "Nick",
        lastMessage: {
          user2: "I'm good",
          messageId: 15,
          reply: 10,
          opened: false,
        },
      },
      {
        userId: 6,
        firstname: "Chris",
        lastname: "Henry",
        lastMessage: {
          user1: "I'm good",
          messageId: 15,
          reply: 10,
          opened: false,
        },
      },
      {
        userId: 7,
        firstname: "Glen",
        lastname: "Phillips",
        lastMessage: {
          user1: "I'm good",
          messageId: 15,
          reply: 10,
          opened: true,
        },
      },
      {
        userId: 8,
        firstname: "Ben",
        lastname: "Stokes",
        lastMessage: {
          user2: "I'm good",
          messageId: 15,
          reply: 10,
          opened: true,
        },
      },
      {
        userId: 9,
        firstname: "Joe",
        lastname: "Root",
        lastMessage: {
          user2: "I'm good",
          messageId: 15,
          reply: 10,
          opened: false,
        },
      },
    ],
  },
];
module.exports = { chats, chatsData, messageData };
