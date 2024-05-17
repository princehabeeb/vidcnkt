const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true
});

const emailToSocketId = new Map();
const socketIdToEmail = new Map();

io.on("connection", socket => {
  console.log("socket connected: ", socket.id);

  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketId.set(email, socket.id);
    socketIdToEmail.set(socket.id, email);

    io.to(socket.id).emit("room:join", data);
  });
})

