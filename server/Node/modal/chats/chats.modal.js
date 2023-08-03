var messageData = [
  {
    message: 1,
    data: [
      {
        sender: "Alex",
        message: "Hello How Are You?",
        messageId: 1,
      },
      {
        sender: "Alex",
        message: "What Are You Doing?",
        messageId: 2,
      },
      {
        sender: "Allison",
        message: "I'm good",
        messageId: 3,
      },
      {
        sender: "Alex",
        message: "Great!",
        messageId: 4,
        reply: 1,
      },
      {
        sender: "Allison",
        message: "I'm good",
        messageId: 5,
      },
      {
        sender: "Allison",
        message: "Great to Hear!",
        messageId: 6,
      },
      {
        sender: "Alex",
        message: "Hello How Are You?",
        messageId: 7,
      },
      {
        sender: "Alex",
        message: "What Are You Doing?",
        messageId: 8,
      },
      {
        sender: "Allison",
        message: "I'm good",
        messageId: 9,
      },
      {
        sender: "Alex",
        message: "Great!",
        messageId: 10,
      },
      {
        sender: "Allison",
        message: "I'm good",
        messageId: 11,
      },
      {
        sender: "Allison",
        message: "Great to Hear!",
        messageId: 12,
        reply: 49,
      },
    ],
  },
  {
    message: 2,
    data: [
      {
        sender: "Jhon",
        message: "Hello How Are You?",
        messageId: 1,
      },
      {
        sender: "Jhon",
        message: "What Are You Doing?",
        messageId: 2,
      },
      {
        sender: "Allison",
        message: "I'm good",
        messageId: 3,
      },
      {
        sender: "Jhon",
        message: "Great!",
        messageId: 4,
      },
      {
        sender: "Allison",
        message: "I'm good",
        messageId: 5,
      },
      {
        sender: "Jhon",
        message: "Great to Hear!",
        messageId: 6,
      },
    ],
  },
  {
    message: 3,
    data: [
      {
        sender: "Thomas",
        message: "Hello How Are You?",
        messageId: 1,
      },
      {
        sender: "Thomas",
        message: "What Are You Doing?",
        messageId: 2,
      },
      {
        sender: "Allison",
        message: "I'm good",
        messageId: 3,
      },
      {
        sender: "Thomas",
        message: "Great!",
        messageId: 4,
      },
      {
        sender: "Allison",
        message: "I'm good",
        messageId: 5,
      },
      {
        sender: "Thomas",
        message: "Great to Hear!",
        messageId: 6,
      },
    ],
  },
  {
    message: 4,
    data: [
      {
        sender: "John",
        message: "Hello How Are You?",
        messageId: 1,
      },
      {
        sender: "John",
        message: "What Are You Doing?",
        messageId: 2,
      },
      {
        sender: "Alex",
        message: "I'm good",
        messageId: 3,
      },
      {
        sender: "John",
        message: "Great!",
        messageId: 4,
      },
      {
        sender: "Alex",
        message: "I'm good",
        messageId: 5,
      },
      {
        sender: "John",
        message: "Great to Hear!",
        messageId: 6,
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
        messages: 4,
      },
      {
        userId: 4,
        messages: 1,
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
