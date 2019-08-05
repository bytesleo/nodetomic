// Libs
import redisAdapter from "socket.io-redis";
// Constants
import { WS, URI_WS_REDIS } from "@/constants/config.constant";

const io = require("socket.io")(WS);
io.adapter(redisAdapter(URI_WS_REDIS));

const connect = () =>
  new Promise((resolve, reject) => {
    console.log(`->Socket: initiated!`);
    io.on("connection", socket => {
      console.log(`->Socket: client connected! (${socket.id})`);

      socket.on("disconnect", reason => {
        console.log(`->Socket: client disconnected! (${socket.id}) ${reason}`);
      });
      resolve({ socket, io });
    });
  });

const connections = () => io.engine.clientsCount;

export { connect, connections };
