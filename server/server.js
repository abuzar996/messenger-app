const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  pingTimeout: 60000,
  cors: { origin: "*" },
});
io.on("connection", (socket) => {
  console.log("server connection successfull");
  socket.on("chat", (chat) => console.log(chat));
  socket.on("setup", (user) => {
    socket.join(user.userId);
    socket.emit("connected");
  });

  socket.on("join chat", (roomId) => {
    socket.join(roomId);
    console.log("user joined chat", roomId);
  });
  socket.on("disconnect", () => {
    console.log("we are disconnected");
  });
});

server.listen(process.env.PORT, () =>
  console.log(`server listening on port: ${process.env.PORT}`)
);
module.exports = {
  server: server,
};
