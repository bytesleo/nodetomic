import { error as errorApi } from "express-easy-helper";

/**
 * error
 *
 * @param {*} res
 * @param {*} e
 * @returns
 */
const error = (res, e) => {
  console.log("\x1b[31m", { err: e });
  if (e instanceof ReferenceError) {
    return errorApi(res, { err: "ReferenceError" });
  } else if (e instanceof TypeError) {
    return errorApi(res, { err: "TypeError" });
  } else {
    return errorApi(res, { err: e });
  }
};

export { error };
