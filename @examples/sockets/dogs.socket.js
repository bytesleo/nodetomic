let socket = null;
let io = null;

export default (_socket, _io) => {
  socket = _socket;
  io = _io;
  on();
};

/**
 * listen events ON
 */
const on = () => {
  // socket.on("dogs:ping", (data) => {
  //   console.log("userId", socket.user.id)
  //   io.emit("dogs:pong", data);
  // });
};

export { socket, io };
