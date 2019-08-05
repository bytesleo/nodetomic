// Libs
import { success, error } from "express-easy-helper";
import validator from "validator";
// Business
import TodoBusiness from "@/business/todo.business";

/**
 * all
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const all = async (req, res) => {
  try {
    const data = await TodoBusiness.allTodos();
    return success(res, data);
  } catch (err) {
    return error(res, { err });
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

    const data = await TodoBusiness.createTodo({
      name,
      completed
    });
    return success(res, 201, data);
  } catch (err) {
    return error(res, { err });
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

    const data = await TodoBusiness.readTodo(todoId);
    return success(res, data);
  } catch (err) {
    return error(res, { err });
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

    const data = await TodoBusiness.updateTodo(todoId, {
      name,
      completed
    });
    return success(res, data);
  } catch (err) {
    return error(res, { err });
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

    const data = await TodoBusiness.removeTodo(todoId);
    return success(res, data);
  } catch (err) {
    return error(res, { err });
  }
};

export default { all, create, read, update, remove };
