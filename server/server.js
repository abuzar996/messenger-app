const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("server connection successfull");
});
io.on("send", () => {
  console.log("hello");
});
server.listen(process.env.PORT, () =>
  console.log(`server listening on port: ${process.env.PORT}`)
);
module.exports = {
  server: server,
};
