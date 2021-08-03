// Models
import DogsModel from '@/models/dogs.model';

const getAll = async () => {
  // Database query
  return await DogsModel.find({});
};

const getAllLogged = async (user_id) => {
  // Database query
  return await DogsModel.find({ user_id });
};

export default {
  getAll,
  getAllLogged
};
