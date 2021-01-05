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

// ttl (seconds)
const TTL = {
  day: 86_400,
  week: 604_800,
  month: 2_592_000,
  bimester: 5_184_000,
  quarter: 7_776_000,
  semester: 15_552_000,
  year: 31_104_000
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
  TTL
};
