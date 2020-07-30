// Models
import UserModel from "@/models/user.model";

/**
 * authenticate
 *
 * @param {*} username
 * @param {*} password
 * @returns
 */
const authenticate = async (username, password) => {
  const user = await UserModel.findOne({
    $or: [
      {
        email: username,
      },
      {
        phone: username,
      },
    ],
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
 * register
 *
 * @param {*} username
 * @param {*} password
 * @returns
 */
const register = async (username, password) => {
  const code = Math.floor(1000 + Math.random() * 9000);
  const user = await UserModel.findOne({
    $or: [
      {
        email: username,
      },
      {
        phone: username,
      },
    ],
  }).lean();

  if (user) {
    throw `${username} is already registered`;
  } else {
    // here send Email with Code if user is created

    const query = {};
    if (username.includes("@")) {
      query.email = username;
      query.phone = username;
    } else {
      query.phone = username;
      query.email = username;
    }

    return await UserModel.create({
      ...query,
      password,
      code_verification: code,
    });
  }
};

/**
 * recover
 *
 * @param {*} email
 * @returns
 */
const recover = async (username) => {
  const code = Math.floor(1000 + Math.random() * 9000);

  const user = await UserModel.findOne({
    $or: [
      {
        email: username,
      },
      {
        phone: username,
      },
    ],
    enabled: true,
  }).lean();

  if (user) {
    // Send code here via Email
    await UserModel.updateOne({ _id: user._id }, { code_verification: code });

    return {
      sent: `Sent code to ${username}`,
    };
  } else {
    throw `${username} is not registered`;
  }
};

/**
 * current
 *
 * @param {*} userId
 * @returns
 */
const current = async (userId) => {
  return await UserModel.findById(userId)
    .select("phone email name last_name created_at")

    .lean();
};

/**
 * verify
 *
 * @param {*} username
 * @param {*} code
 * @returns
 */
const verify = async (username, code) => {
  const user = await UserModel.findOne({
    $or: [
      {
        email: username,
      },
      {
        phone: username,
      },
    ],
    code_verification: code,
    enabled: true,
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
  authenticate,
  register,
  recover,
  current,
  verify,
};
