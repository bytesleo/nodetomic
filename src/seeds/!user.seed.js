// Models
import UserModel from '@/models/user.model';
// Utils
import { insert } from '@/utils/seed.util';
// Data
const data = [
  {
    _id: '6108db02bb8ea9e69b2984a2',
    name: 'User',
    last_name: 'Example',
    phone: '1234567892',
    email: 'user@examp4le.com',
    password: '123',
    permissions: ['user']
  }
];

export default async () => await insert(UserModel, data);
