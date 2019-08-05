// Libs
import { success, error, unauthorized } from "express-easy-helper";
import validator from "validator";
// Business
import AuthBusiness from "@/business/auth.business";
// Utils
import { session } from "@/utils/auth.util";
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
    const { email, password } = req.body;

    if (validator.isEmpty(email)) throw "The email cannot be empty";
    if (validator.isEmpty(password)) throw "The password cannot be empty";

    const user = await AuthBusiness.authenticateUser(email, password);
    if (user) {
      const { _id, permissions } = user;
      const token = await session(_id, { permissions }, TTL.one_year);
      return success(res, { token });
    } else {
      return unauthorized(res);
    }
  } catch (err) {
    return error(res, { err });
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
    const { name, last_name, email, password } = req.body;

    if (validator.isEmpty(name)) throw "The name cannot be empty";
    if (validator.isEmpty(last_name)) throw "The last_name cannot be empty";
    if (validator.isEmpty(email)) throw "The email cannot be empty";
    if (!validator.isEmail(email)) throw "The email is not valid";
    if (validator.isEmpty(phone)) throw "The phone cannot be empty";
    if (!validator.isMobilePhone(phone)) throw "The phone is not valid";
    if (validator.isEmpty(password)) throw "The password cannot be empty";

    const data = await AuthBusiness.registerUser(
      name,
      last_name,
      email,
      password
    );
    let created = "_id" in data || "n" in data;
    return success(res, 201, { created });
  } catch (err) {
    return error(res, { err });
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
    const { email } = req.body;

    if (validator.isEmpty(email)) throw "The email cannot be empty";
    if (!validator.isEmail(email)) throw "The email is not valid";

    const data = await AuthBusiness.recoverUser(email);
    return success(res, data);
  } catch (err) {
    return error(res, { err });
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

    if (user) {
      let data = await AuthBusiness.currentUser(userId);
      return data ? success(res, data) : unauthorized(res);
    } else {
      return unauthorized(res);
    }
  } catch (err) {
    return error(res, { err });
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
    const { phone, code } = req.body;

    if (validator.isEmpty(phone)) throw "The phone cannot be empty";
    if (!validator.isMobilePhone(phone)) throw "The phone is not valid";
    if (validator.isEmpty(code)) throw "The code cannot be empty";

    const user = await AuthBusiness.verifyCode(phone, code);
    if (user) {
      const { _id, permissions } = user;
      const token = await session(_id, { permissions }, TTL.one_year);
      return success(res, { token, permissions });
    } else {
      return unauthorized(res);
    }
  } catch (err) {
    return error(res, { err });
  }
};

export default { login, register, recover, me, verify };
