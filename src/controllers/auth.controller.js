import { unauthorized } from "express-easy-helper";
import validator from "validator";
// Business
import AuthBusiness from "@/business/auth.business";
// Utils
import { session } from "@/utils/auth.util";
import { success, error } from "@/utils/helper.util";
// Constants
import { TTL } from "@/constants/config.constant";

/**
 * login
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (validator.isEmpty(username)) throw "The email cannot be empty";
    if (validator.isEmpty(password)) throw "The password cannot be empty";

    const user = await AuthBusiness.login(username, password);
    if (user) {
      const { _id, permissions } = user;
      const token = await session(_id, { permissions }, TTL.one_year);
      return success(res, { token });
    } else {
      return unauthorized(res);
    }
  } catch (err) {
    error(res, err);
  }
};

/**
 * register
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (validator.isEmpty(username)) throw "The username cannot be empty";
    if (validator.isEmpty(password)) throw "The password cannot be empty";

    const data = await AuthBusiness.register(username, password);
    let created = "_id" in data || "n" in data;
    return success(res, 201, { created });
  } catch (err) {
    error(res, err);
  }
};

/**
 * recover
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const recover = async (req, res) => {
  try {
    const { username } = req.body;

    if (validator.isEmpty(username)) throw "The email cannot be empty";
    // if (!validator.isEmail(username)) throw "The email is not valid";

    const data = await AuthBusiness.recover(username);
    return success(res, data);
  } catch (err) {
    error(res, err);
  }
};

/**
 * me
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const me = async (req, res) => {
  try {
    const userId = req.user.id;

    if (validator.isEmpty(userId)) throw "The userId cannot be empty";
    if (!validator.isMongoId(userId)) {
      throw "Invalid auth userId...";
    }

    if (userId) {
      let data = await AuthBusiness.me(userId);
      return data ? success(res, data) : unauthorized(res);
    } else {
      return unauthorized(res);
    }
  } catch (err) {
    error(res, err);
  }
};

/**
 * verify
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const verify = async (req, res) => {
  try {
    const { username, code } = req.body;

    if (validator.isEmpty(username)) throw "The phone cannot be empty";
    if (validator.isEmpty(code)) throw "The code cannot be empty";

    const user = await AuthBusiness.verify(username, code);
    if (user) {
      const { _id, permissions } = user;
      const token = await session(_id, { permissions }, TTL.one_year);
      return success(res, { token });
    } else {
      return unauthorized(res);
    }
  } catch (err) {
    error(res, err);
  }
};

export default { login, register, recover, me, verify };
