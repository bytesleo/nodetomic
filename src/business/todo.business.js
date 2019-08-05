// Models
import TodoModel from "@/models/todo.model";

/**
 * allTodos
 *
 * @returns
 */
const allTodos = async () => {
  return await TodoModel.find().sort({ created_at: 1 });
};

/**
 * createTodo
 *
 * @param {*} { name, completed }
 * @returns
 */
const createTodo = async ({ name, completed }) => {
  return await TodoModel.create({
    name,
    completed
  });
};

/**
 * readTodo
 *
 * @param {*} todoId
 * @returns
 */
const readTodo = async todoId => {
  return await TodoModel.find({ _id: todoId });
};

/**
 * updateTodo
 *
 * @param {*} todoId
 * @param {*} { name, completed }
 * @returns
 */
const updateTodo = async (todoId, { name, completed }) => {
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
 * removeTodo
 *
 * @param {*} todoId
 * @returns
 */
const removeTodo = async todoId => {
  return await TodoModel.deleteOne({ _id: todoId });
};

export default {
  allTodos,
  createTodo,
  readTodo,
  updateTodo,
  removeTodo
};
