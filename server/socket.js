const io = new Server(server);
io.on("connection", (socket) => {
  console.log("server connection successfull");
});
io.on("send", () => {
  console.log("hello");
});
