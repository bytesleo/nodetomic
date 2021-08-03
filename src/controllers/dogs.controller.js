// Business
import DogBusiness from '@/business/dogs.business';
import { success, error } from '@/utils/helper.util';
// Libs
import validator from 'validator';

const getAll = async (req, res) => {
  try {
    // Business logic
    const data = await DogBusiness.getAll();
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

const getAllLogged = async (req, res) => {
  try {
    // Get current user id from session
    const user_id = req.user.id;
    // Validate data format
    if (!validator.isMongoId(user_id)) {
      throw {
        code: 'ERROR_AUTH_4',
        message: 'Invalid auth User id...'
      };
    }
    // Business logic
    const data = await DogBusiness.getAllLogged(user_id);
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

export default { getAll, getAllLogged };
