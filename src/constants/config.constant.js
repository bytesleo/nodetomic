// Env
import dotenv from "dotenv";
dotenv.config();

const NAME = process.env.NAME;

const MODE = process.env.MODE;

const HOST = process.env.HOST;

const PORT = process.env.PORT;

const WS = process.env.WS;

const URI_DB = process.env.URI_DB;

const URI_REDIS = process.env.URI_REDIS;

const URI_WS_REDIS = process.env.URI_WS_REDIS;

const JWT_SECRET = process.env.JWT_SECRET;

const TTL = {
  one_day: 86400,
  one_week: 604800,
  one_year: 31536000
};

export {
  NAME,
  MODE,
  HOST,
  PORT,
  WS,
  URI_DB,
  URI_REDIS,
  URI_WS_REDIS,
  JWT_SECRET,
  TTL
};
