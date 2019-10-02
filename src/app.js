// Utils/Libs
import { create as express } from "@/libs/express.lib";
import { connect as mongoose } from "@/libs/mongoose.lib";
import { connect as redis } from "@/libs/redis.lib";
import { connect as ws } from "@/libs/socketio.lib";
/**
 * init
 */
const init = async () => {
  // 1. Create Express app
  const app = await express();
  // 2. Connect to DB (You can enable seeds)
  await db();
  // 3. Connect to Redis
  await redis();
  // 4. Add Routes to app
  await routes(app);
  // 5. Connect Sockets (idle to connections...)
  sockets();
  // 6. return app to init listen
  return app;
};

/**
 * DB
 */
const db = async () => {
  await mongoose();
  // await require("@/seeds/user.seed").default();
  // await require("@/seeds/todo.seed").default();
};

/**
 * Routes
 */
const routes = app => {
  require("@/routes/auth.route").default(app);
  require("@/routes/todo.route").default(app);
};

/**
 * Sockets
 */
const sockets = async () => {
  const { socket, io } = await ws();
  require("@/sockets/todo.socket").default(socket, io);
};

export { init };
