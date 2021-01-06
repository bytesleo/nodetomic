// Env
import dotenv from 'dotenv';
dotenv.config();

const NAME = process.env.NAME;

const MODE = process.env.MODE;

const HOST = process.env.HOST;

const PORT = process.env.PORT;

const WS = process.env.WS;

const DOMAIN = process.env.DOMAIN;

const URI_DB = process.env.URI_DB;

const URI_REDIS = process.env.URI_REDIS;

const URI_WS_REDIS = process.env.URI_WS_REDIS;

const JWT_SECRET = process.env.JWT_SECRET;

// (seconds, by default quarter)
const REDIS_TTL = {
  day: 86400,
  week: 604800,
  month: 2592000,
  bimester: 5184000,
  trimester: 7776000,
  semester: 15552000,
  year: 31104000
};

export {
  NAME,
  MODE,
  HOST,
  PORT,
  WS,
  DOMAIN,
  URI_DB,
  URI_REDIS,
  URI_WS_REDIS,
  JWT_SECRET,
  REDIS_TTL
};
