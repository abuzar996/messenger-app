const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const server = http.createServer(app);
const { Server } = require("socket.io");
const MongoUrl =
  "mongodb+srv://messenger-api:DT3x4w5uGIlesS3h@messenger.vpgis2y.mongodb.net/messenger?retryWrites=true&w=majority";
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
mongoose.connection.once("open", () => {
  console.log("MongoDb Connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDb caused ${err.message}`);
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
