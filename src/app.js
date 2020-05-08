// Base
import { create as express } from "@/libs/express.lib";
import { connect as mongoose } from "@/libs/mongoose.lib";
import { connect as redis } from "@/libs/redis.lib";
import { connect as ws } from "@/libs/socketio.lib";
import { autoload } from "@/utils/autoload.util";

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
  // Load Models
  await autoload("models");
  // Load Seeds
  // await autoload("seeds");
};

/**
 * Routes
 */
const routes = async () => {
  // Load routes
  await express(await autoload("routes"));
};

/**
 * Sockets
 */
const sockets = async () => {
  const { socket, io } = await ws();
  // Load sockets
  autoload("sockets", { socket, io });
};

export { init };
