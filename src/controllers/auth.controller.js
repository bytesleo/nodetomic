// Libs
import { success, error, unauthorized } from "express-easy-helper";
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
