// Models
import TodoModel from '@/models/dogs.model';
// Utils
import { insert } from '@/utils/seed.util';
// Data
const data = [
  {
    name: 'Sparky',
    race: 'Beagle',
    user_id: '6108db02bb8ea9e69b2984a2'
  },
  {
    name: 'Zeus',
    race: 'Chihuahua',
    user_id: '6108db02bb8ea9e69b2984a2'
  },
  {
    name: 'Poseidon',
    race: 'Bulldog',
    user_id: '6108db1b8d75624c1dd2ba2f'
  }
];

export default async () => await insert(TodoModel, data);
