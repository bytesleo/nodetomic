let socket = null;
let io = null;

export default (_socket, _io) => {
  socket = _socket;
  io = _io;
  on();
};

/**
 * on
 *
 */
const on = () => {
  socket.on("dogs:new", data => emit("dogs:add", data));
};

/**
 * emit
 *
 * @param {*} event
 * @param {*} data
 */
const emit = (event, data) => io.emit(event, data);

export { socket, io, emit };
