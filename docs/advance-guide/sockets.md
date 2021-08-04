---
title: Sockets
parent: Advance Guide
has_children: false
nav_order: 1
---

# Sockets

```javascript
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
```
