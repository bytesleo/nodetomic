import redisAdapter from "socket.io-redis";
// Constants
import { WS, URI_WS_REDIS } from "@/constants/config.constant";
// Utils
import autoload from "@/utils/autoload.util";
import { mws } from "@/utils/middleware.util";

const io = require("socket.io")(WS);
io.adapter(redisAdapter(URI_WS_REDIS));
// io.eio.pingTimeout = 120000; // 2 minutes
// io.eio.pingInterval = 5000; // 5 seconds

const connect = (required = []) =>
  new Promise((resolve, reject) => {
    console.log(`✅ Socket: initiated!`);
    // connection
    io.on("connection", (socket) => {
      console.log(`❕Socket: client connected! (${socket.id})`);
      // middleware
      socket.use(async (packet, next) => {
        // log
        console.log("Socket:event", packet);
        // authenticate
        return await mws(socket, packet, required, next);
      });
      // disconnect
      socket.on("disconnect", (reason) => {
        console.log(`❕Socket: client disconnected! (${socket.id}) ${reason}`);
      });
      // socket.set("pingTimeout", 63000);
      // autload
      autoload.sockets(socket, io);
      resolve();
    });
  });

const connections = () => io.engine.clientsCount;

export { connect, connections };
