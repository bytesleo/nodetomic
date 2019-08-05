// Libs
import { success, error } from "express-easy-helper";
// Business
import UserBusiness from "@/business/user.business";

const update = async (req, res) => {
  try {
    const { name, last_name, phone, email, password } = req.body;
    const userId = req.user.id;
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
