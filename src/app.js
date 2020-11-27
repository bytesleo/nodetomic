// base
import { create as express } from "@/libs/express.lib";
import { connect as mongoose } from "@/libs/mongoose.lib";
import { connect as redis } from "@/libs/redis.lib";
import { connect as ws } from "@/libs/socketio.lib";
import autoload from "@/utils/autoload.util";

/**
 * init
 */
const init = async () => {
  // 1. connect to DB (You can enable seeds)
  await db();
  // 2. connect to Redis
  await redis();
  // 3. create Express app and add routes
  await routes();
  // 4. connect Sockets (idle to connections...)
  sockets();
};

/**
 * db
 */
const db = async () => {
  await mongoose();
  // Load Models
  await autoload.models();
  // Load Seeds
  await autoload.seeds();
};

/**
 * routes
 */
const routes = async () => {
  // Load routes
  await express(await autoload.routes());
};

/**
 * sockets
 */
const sockets = async () => {
  await ws([
    // {
    //   event: "example",
    //   permissions: ["user"],
    //   auth: true,
    // },
  ]);
};

export { init };
