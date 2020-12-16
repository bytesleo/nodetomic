import jsonwebtoken from 'jsonwebtoken';
// Constants
import { JWT_SECRET, TTL } from '@/constants/config.constant';
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
 * verify (JWT)
 *
 * @param {*} data
 * @returns
 */
const verify = async (data) => {
  try {
    return await jsonwebtoken.verify(data, JWT_SECRET);
  } catch (err) {
    console.log({ err });
    return null;
  }
};

/**
 * session (Redis)
 *
 * @param {*} id
 * @param {*} data
 * @returns
 */
const session = async (id, data) => {
  try {
    const key = `${id}:${hash(8)}`;
    const token = await sign({ key, ...data });
    if (token) {
      await redis.set(key, token, 'EX', TTL.one_month);
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
    const decode = await verify(token);
    if ('key' in decode) {
      const exists = await redis.get(decode.key);
      return exists && token === exists ? decode : false;
    } else {
      return false;
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
const renew = async (key, type) => {
  try {
    if (type === 'keep') {
      await redis.expire(key, TTL.one_month);
    }
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

export { session, check, destroy, sign, verify, hash, renew };
