import validator from 'validator';
// Utils
import { forbidden, unauthorized, error } from '@/utils/helper.util';
import { check, renew } from '@/utils/auth.util';

/**
 * mw
 *
 * @param {*} required
 * @returns next()
 */
const mw = (required) => {
  return async (req, res, next) => {
    try {
      let token = req.headers['authorization'];

      if (token) {
        try {
          // Is JWT format
          if (!validator.isJWT(token)) throw 'Token is not valid';

          // Add Bearer to authorization Header
          req.headers.authorization = `Bearer ${token}`;
          // Verify Token in Redis, if exists, then return decode token { key, ...data, iat }
          const decoded = await check(token);

          // Validate permissions
          if (required) {
            if ('permissions' in decoded) {
              const isAuthorized = required.filter((x) =>
                decoded.permissions.includes(x)
              );
              if (isAuthorized.length === 0) return forbidden(res);
            }
          }

          // Renew
          await renew(decoded.key);
          // Add to request
          req.user = decoded;

          return next();
        } catch (errSession) {
          return unauthorized(res);
        }
      } else {
        return unauthorized(res);
      }
    } catch (err) {
      return error(res, err);
    }
  };
};

/**
 * mws
 *
 * @param {*} socket
 * @param {*} next
 * @returns next()
 */
const mws = async (socket, next) => {
  try {
    const token = socket.handshake.query?.Authorization;

    if (token) {
      // Is JWT format
      if (!validator.isJWT(token)) throw 'Token is not valid';

      // Verify Token in Redis, if exists, then return decode token { key, iat }
      const decoded = await check(token);

      // Renew
      await renew(decoded.key);

      // Add to request
      socket.user = {
        ...decoded,
        data: JSON.parse(socket.handshake.query?.data) || null
      };

      return next();
    } else {
      return next();
    }
  } catch (err) {
    console.log('❕Socket: error->', err.toString());
    return next(err);
  }
};

export { mw, mws };
