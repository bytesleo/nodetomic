import redisAdapter from 'socket.io-redis';
// Constants
import {
  SERVER_WEBSOCKET_PORT,
  REDIS_HOSTNAME,
  REDIS_PORT,
  REDIS_PASSWORD
} from '@/constants/config.constant';
// Business
// import UserBusiness from '@/business/users.business';
// Utils
import autoload from '@/utils/autoload.util';
import { mws } from '@/utils/middleware.util';

const io = require('socket.io')(SERVER_WEBSOCKET_PORT);
const PORT = require('net').isIP(REDIS_HOSTNAME) ? `:${REDIS_PORT}` : '';

io.adapter(
  redisAdapter(
    REDIS_PASSWORD
      ? `redis://:${REDIS_PASSWORD}@${REDIS_HOSTNAME}${PORT}/1`
      : `redis://${REDIS_HOSTNAME}${PORT}/1`
  )
);
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
        // UserBusiness.removeSocket(socket);
      });
      // socket.set("pingTimeout", 63000);
      // autoload
      autoload.sockets(socket, io);
      resolve();
    });

    // middleware
    io.use(async (socket, next) => {
      socket.onAny(async (event) => {
        console.log(`Socket: event: ${event} (${socket.id})`);
      });

      const _next = await mws(socket, next);
      // UserBusiness.setSocket(socket);
      return _next;
    });
  });

const connections = () => io.engine.clientsCount;

export { connect, connections };
