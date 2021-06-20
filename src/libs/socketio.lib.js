import redisAdapter from 'socket.io-redis';
// Constants
import { WS, URI_WS_REDIS } from '@/constants/config.constant';
// Utils
import autoload from '@/utils/autoload.util';
import { mws } from '@/utils/middleware.util';

const io = require('socket.io')(WS);
io.adapter(redisAdapter(URI_WS_REDIS));
// Settings
// io.eio.pingTimeout = 120000; // 2 minutes
// io.eio.pingInterval = 5000; // 5 seconds

const connect = () =>
  new Promise((resolve) => {
    console.log(`✅ Socket: initiated!`);
    // connection
    io.on('connection', (socket) => {
      console.log(`❕Socket: client connected! (${socket.id})`);

      // disconnect
      socket.on('disconnect', (reason) => {
        console.log(`❕Socket: client disconnected! (${socket.id}) ${reason}`);
        // Remove user socket from db
        // UserBusiness.removeSocket(socket);
      });
      // autoload
      autoload.sockets(socket, io);
      resolve();
    });

    // middleware
    io.use(async (socket, next) => {
      socket.onAny(async (event) => {
        console.log(`Socket: event: ${event} (${socket.id})`);
      });
      // Save user socket from db
      // UserBusiness.setSocket(socket);
      return await mws(socket, next);
    });
  });

const connections = () => io.engine.clientsCount;

export { connect, connections };
