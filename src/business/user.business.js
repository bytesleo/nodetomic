// Models
import UserModel from "@/models/user.model";

/**
 * updateUser
 *
 * @param {*} userId
 * @param {*} { name, last_name, phone, email, password }
 * @returns
 */
const updateUser = async (
  userId,
  { name, last_name, phone, email, password }
) => {
  let query = { name, last_name, phone, email, password };
  if (password) query.password = password;
  return await UserModel.updateOne({ _id: userId }, query);
};

export default {
  updateUser
};
