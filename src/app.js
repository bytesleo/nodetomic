// Utils/Libs
import { create as express } from "@/libs/express.lib";
import { connect as mongoose } from "@/libs/mongoose.lib";
import { connect as redis } from "@/libs/redis.lib";
import { connect as ws } from "@/libs/socketio.lib";

/**
 * init
 */
const init = async () => {
  // 1. Connect to DB (You can enable seeds)
  await db();
  // 2. Connect to Redis
  await redis();
  // 3. Create Express app and add routes
  await routes();
  // 4. Connect Sockets (idle to connections...)
  sockets();
};

/**
 * DB
 */
const db = async () => {
  await mongoose();
  // Models
  require("@/models/user.model");
  require("@/models/todo.model");
  // Seeds
  // await require("@/seeds/user.seed").default();
  // await require("@/seeds/todo.seed").default();
};

/**
 * Routes
 */
const routes = async () => {
  await express([
    require("@/routes/auth.route").default,
    require("@/routes/todo.route").default
  ]);
};

/**
 * Sockets
 */
const sockets = async () => {
  const { socket, io } = await ws();
  require("@/sockets/todo.socket").default(socket, io);
};

export { init };
