import jsonwebtoken from 'jsonwebtoken';
import moment from 'moment';
// Constants
import { JWT_SECRET, REDIS_TTL } from '@/constants/config.constant';
// Utils
import { redis } from '@/libs/redis.lib';

/**
 * hash
 *
 * @param {*} length
 * @returns
 */
const hash = (length) => {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

/**
 * sign (JWT)
 *
 * @param {*} data
 * @returns
 */
const sign = async (data) => {
  try {
    return await jsonwebtoken.sign(data, JWT_SECRET);
  } catch (err) {
    console.log({ err });
    return null;
  }
};

/**
 * decode (JWT)
 *
 * @param {*} token
 * @returns
 */
const decode = async (token) => {
  try {
    return await jsonwebtoken.decode(token, JWT_SECRET);
  } catch (err) {
    console.log({ err });
    return null;
  }
};

/**
 * session (Redis)
 *
 * @param {*} userId
 * @param {*} data
 * @returns
 */
const session = async (id, data) => {
  try {
    const key = `${id}:${hash(8)}`;
    const token = await sign({ key, ...data });
    if (token) {
      await redis.set(key, moment().toISOString(), 'EX', REDIS_TTL.trimester);
      return token;
    } else {
      throw 'The key could not be created';
    }
  } catch (err) {
    console.log({ err });
    return null;
  }
};

/**
 * check (Redis)
 *
 * @param {*} token
 * @returns
 */
const check = async (token) => {
  try {
    const decoded = await decode(token);
    const data = await redis.get(decoded.key);
    if (decoded?.key) {
      const [id] = decoded.key.split(':');
      return decoded?.key && data ? { ...decoded, id } : null;
    } else {
      return null;
    }
  } catch (err) {
    console.log({ err });
    return null;
  }
};

/**
 * renew (Redis)
 *
 * @param {*} key
 */
const renew = async (key) => {
  try {
    await redis.expire(key, REDIS_TTL.trimester);
  } catch (err) {
    console.log({ err });
    return null;
  }
};

/**
 * destroy (Redis)
 *
 * @param {*} key
 */
const destroy = async (key) => {
  try {
    await redis.del(key);
  } catch (err) {
    console.log({ err });
    return null;
  }
};

export { session, check, destroy, sign, decode, hash, renew };
