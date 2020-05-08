import { success } from "express-easy-helper";
import validator from "validator";
// Business
import TodoBusiness from "@/business/todo.business";
import { error } from "@/utils/helper.util";

/**
 * all
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const all = async (req, res) => {
  try {
    const data = await TodoBusiness.all();
    return success(res, data);
  } catch (err) {
    error(res, err);
  }
};

/**
 * create
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const create = async (req, res) => {
  try {
    const { name, completed } = req.body;

    if (validator.isEmpty(name)) throw "The name cannot be empty";
    if (validator.isEmpty(completed)) throw "The completed cannot be empty";
    if (!validator.isBoolean(completed)) throw "The completed is not valid";

    const data = await TodoBusiness.create({
      name,
      completed
    });
    return success(res, 201, data);
  } catch (err) {
    error(res, err);
  }
};

/**
 * read
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const read = async (req, res) => {
  try {
    const todoId = req.params.id;

    if (validator.isEmpty(todoId)) throw "The todoId cannot be empty";
    if (!validator.isMongoId(todoId)) throw "The todoId is not valid";

    const data = await TodoBusiness.read(todoId);
    return success(res, data);
  } catch (err) {
    error(res, err);
  }
};

/**
 * update
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const update = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { name, completed } = req.body;

    if (validator.isEmpty(todoId)) throw "The todoId cannot be empty";
    if (!validator.isMongoId(todoId)) throw "The todoId is not valid";
    if (validator.isEmpty(name)) throw "The name cannot be empty";
    if (validator.isEmpty(completed)) throw "The completed cannot be empty";
    if (!validator.isBoolean(completed)) throw "The completed is not valid";

    const data = await TodoBusiness.update(todoId, {
      name,
      completed
    });
    return success(res, data);
  } catch (err) {
    error(res, err);
  }
};

/**
 * remove
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const remove = async (req, res) => {
  try {
    const todoId = req.params.id;

    if (validator.isEmpty(todoId)) throw "The todoId cannot be empty";
    if (!validator.isMongoId(todoId)) throw "The todoId is not valid";

    const data = await TodoBusiness.remove(todoId);
    return success(res, data);
  } catch (err) {
    error(res, err);
  }
};

export default { all, create, read, update, remove };
