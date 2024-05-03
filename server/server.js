const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  pingTimeout: 60000,
  cors: { origin: "*" },
});
io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    socket.join(user.userId);
  });

  socket.on("join chat", (roomId) => {
    socket.join(roomId);
    console.log("user joined chat", roomId);
  });
  socket.on("new message", (newMessageRecieved) => {
    socket.in(newMessageRecieved.sentTo).emit("message recieved", {
      messageId: newMessageRecieved.messageId,
      sender: newMessageRecieved.sender,
      senderId: newMessageRecieved.senderId,
      message: newMessageRecieved.message,
      sentTo: newMessageRecieved.sentTo,
      userId: newMessageRecieved.userId,
      reply: newMessageRecieved.reply,
    });
  });
});

const startServer = async () => {
  // await mongoose.connect(MongoUrl, {
  //   useNewUrlParser: true,

  //   useUnifiedTopology: true,
  // });

  server.listen(process.env.PORT, () =>
    console.log(`server listening on port: ${process.env.PORT}`)
  );
};

startServer();
