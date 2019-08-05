// Models
import UserModel from "@/models/user.model";

/**
 * authenticateUser
 *
 * @param {*} email
 * @param {*} password
 * @returns
 */
const authenticateUser = async (email, password) => {
  const user = await UserModel.findOne({
    email
  })
    .select("+password")
    .lean();

  if (user) {
    if (!user.enabled) throw `The user has been banned"`;
    const isMatch = await UserModel.compare(password, user.password);
    if (!isMatch) throw "Incorrect password";
    return user;
  } else {
    throw "User not found";
  }
};

/**
 *
 * registerUser
 *
 * @param {*} email
 * @param {*} password
 * @returns
 */
const registerUser = async (name, last_name, email, password) => {
  const code = Math.floor(1000 + Math.random() * 9000);
  const user = await UserModel.findOne({
    email
  }).lean();

  if (user) {
    throw `The email ${email} is already registered`;
  } else {
    // here send Email with Code if user is created

    return await UserModel.create({
      name,
      last_name,
      email,
      password,
      code_verification: code
    });
  }
};

/**
 * recoverUser
 *
 * @param {*} email
 * @returns
 */
const recoverUser = async email => {
  const code = Math.floor(1000 + Math.random() * 9000);

  const user = await UserModel.findOne({
    email,
    enabled: true
  }).lean();

  if (user) {
    // Send code here via Email
    return await UserModel.updateOne(
      { _id: user._id },
      { code_verification: code }
    );
  } else {
    throw "The email is not registered";
  }
};

/**
 * currentUser
 *
 * @param {*} userId
 * @returns
 */
const currentUser = async userId => {
  return await UserModel.findById(userId)
    .select("-code_verification -enabled")
    .lean();
};

/**
 * verifyCode
 *
 * @param {*} code
 * @returns
 */
const verifyCode = async code => {
  const user = await UserModel.findOne({
    code_verification: code,
    enabled: true
  }).lean();

  if (user) {
    return await UserModel.findOneAndUpdate(
      { _id: user._id },
      { code_verification: null },
      { new: true }
    );
  } else {
    throw "Invalid Code";
  }
};

export default {
  authenticateUser,
  registerUser,
  recoverUser,
  currentUser,
  verifyCode
};
