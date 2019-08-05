// Libs
import { success, error } from "express-easy-helper";

/**
 * create
 *
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  try {
    console.log("🎉 We got an new todo!");
    success(res, "success!");
  } catch (err) {
    error(res, { err });
  }
};

export default { create };
