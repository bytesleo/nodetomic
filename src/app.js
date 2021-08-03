// base
import { create as express } from '@/libs/express.lib';
import { connect as mongoose } from '@/libs/mongoose.lib';
import { connect as redis } from '@/libs/redis.lib';
import { connect as ws } from '@/libs/socketio.lib';
import autoload from '@/utils/autoload.util';

/**
 * init
 */
const init = async () => {
  // Connect to DB (You can enable seeds)
  await db();
  // Connect to Redis
  await redis();
  // Add cronjobs
  await cronjobs();
  // Create Express app and add routes
  await routes();
  // Connect Sockets (idle to connections...)
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
 * cronjobs
 */
const cronjobs = async () => {
  // Load cronjobs
  await autoload.cronjobs();
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
  await ws();
};

export { init };
