// Models
import DogsModel from '@/models/dogs.model';

const all = async () => {
  return await DogsModel.find({});
};

const allLogged = async (userId) => {
  console.log(`Current userId: ${userId}`);
  return await DogsModel.find({});
};

export default {
  all,
  allLogged
};
