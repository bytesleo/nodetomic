// Env
import dotenv from 'dotenv';
dotenv.config();

export const PROJECT_MODE = process.env.PROJECT_MODE;

export const PROJECT_NAME = process.env.PROJECT_NAME;

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;

export const SERVER_PORT = process.env.SERVER_PORT;

export const SERVER_WEBSOCKET_PORT = process.env.SERVER_WEBSOCKET_PORT;

export const SWAGGER_HOSTNAME = process.env.SWAGGER_HOSTNAME;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const MONGODB_HOSTNAME = process.env.MONGODB_HOSTNAME;

export const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

export const MONGODB_USERNAME = process.env.MONGODB_USERNAME;

export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

export const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;

export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

// (seconds, by default trimester)
export const REDIS_TTL = {
  day: 86400,
  week: 604800,
  month: 2592000,
  bimester: 5184000,
  trimester: 7776000,
  semester: 15552000,
  year: 31104000
};
