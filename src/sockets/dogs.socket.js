// Vars
let socket = null;
let io = null;

// Constructor
export default (_socket, _io) => {
  socket = _socket;
  io = _io;
  on();
};

// Listen events
const on = () => {
  socket.on('dogs:ping', (data) => {
    io.emit('dogs:pong', data);
  });
};

export { socket, io };
