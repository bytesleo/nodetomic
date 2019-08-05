// Libs
import { success, error } from "express-easy-helper";
import validator from "validator";
// Business
import UserBusiness from "@/business/user.business";

const update = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, last_name, phone, email, password } = req.body;

    if (validator.isEmpty(userId)) throw "The userId cannot be empty";
    if (validator.isEmpty(name)) throw "The name cannot be empty";
    if (validator.isEmpty(last_name)) throw "The last_name cannot be empty";
    if (validator.isEmpty(email)) throw "The email cannot be empty";
    if (!validator.isEmail(email)) throw "The email is not valid";
    if (validator.isEmpty(phone)) throw "The phone cannot be empty";
    if (!validator.isMobilePhone(phone)) throw "The phone is not valid";

    const data = await UserBusiness.updateUser(userId, {
      name,
      last_name,
      phone,
      email,
      password
    });
    success(res, data);
  } catch (err) {
    error(res, { err });
  }
};

export default { update };
