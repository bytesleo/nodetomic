import { error as errorApi } from "express-easy-helper";
import chalk from "chalk";

/**
 * error
 *
 * @param {*} res
 * @param {*} e
 * @returns
 */
const error = (res, e) => {
  console.log(`err: ${chalk.red.bold(e)}`, e);
  if (e instanceof ReferenceError) {
    return errorApi(res, { err: "ReferenceError" });
  } else if (e instanceof TypeError) {
    return errorApi(res, { err: "TypeError" });
  } else {
    return errorApi(res, { err: e });
  }
};

export { error };
