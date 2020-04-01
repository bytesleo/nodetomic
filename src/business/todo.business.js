// Models
import TodoModel from "@/models/todo.model";

/**
 * all
 *
 * @returns
 */
const all = async () => {
  return await TodoModel.find().sort({ created_at: 1 });
};

/**
 * create
 *
 * @param {*} { name, completed }
 * @returns
 */
const create = async ({ name, completed }) => {
  return await TodoModel.create({
    name,
    completed
  });
};

/**
 * read
 *
 * @param {*} todoId
 * @returns
 */
const read = async todoId => {
  return await TodoModel.find({ _id: todoId });
};

/**
 * update
 *
 * @param {*} todoId
 * @param {*} { name, completed }
 * @returns
 */
const update = async (todoId, { name, completed }) => {
  return await TodoModel.updateOne(
    { _id: todoId },
    {
      name,
      completed,
      updated_at: new Date(Date.now()).toISOString()
    }
  );
};

/**
 * remove
 *
 * @param {*} todoId
 * @returns
 */
const remove = async todoId => {
  return await TodoModel.deleteOne({ _id: todoId });
};

export default {
  all,
  create,
  read,
  update,
  remove
};
