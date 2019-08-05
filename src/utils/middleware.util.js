// Libs
import { forbidden, error } from "express-easy-helper";
import validator from "validator";
// Utils
import { check } from "@/utils/auth.util";

/**
 * mw
 *
 * @param {*} required
 * @returns next()
 */
const mw = required => {
  return async (req, res, next) => {
    try {
      let token = req.headers["authorization"];

      if (token) {
        // Is JWT format
        if (validator.isJWT(token)) throw "Token is not valid";
        // Add Bearer to authorization Header
        req.headers.authorization = `Bearer ${token}`;

        // Verify Token in Redis, if exists, then return decode token { key, iat}
        const session = await check(token);
        if (!session) return next(forbidden(res));

        // Validate permissions
        if (required) {
          if ("permissions" in session) {
            const isAuthorized = required.filter(x =>
              session.permissions.includes(x)
            );
            if (isAuthorized.length === 0) return next(forbidden(res));
          }
        }

        // Extract current id of user
        let [id] = session.key.split(":");
        req.user = { ...session, ...{ id } };

        return next();
      } else {
        return next(forbidden(res));
      }
    } catch (err) {
      return next(error(req.res, { err }));
    }
  };
};

export { mw };
