// Models
import DogsModel from "@/models/dogs.model";

const all = async () => {
  return await DogsModel.find({});
};

export default {
  all,
};
