// Models
import TodoModel from "@/models/dogs.model";
// Utils
import { many } from "@/utils/seed.util";
// Data
const data = [
  {
    name: "Sparky",
    race: "Beagle",
  },
  {
    name: "Zeus",
    race: "Chihuahua",
  },
  {
    name: "Poseidon",
    race: "Bulldog",
  },
];

export default async () => await many(TodoModel, data);
