// Business
import DogBusiness from "@/business/dogs.business";
import { success, error } from "@/utils/helper.util";

const all = async (req, res) => {
  try {
    const data = await DogBusiness.all();
    success(res, data);
  } catch (err) {
    error(res, err);
  }
};

export default { all };
