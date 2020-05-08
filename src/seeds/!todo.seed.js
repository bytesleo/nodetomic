// Models
import TodoModel from "@/models/todo.model";
// Utils
import { many } from "@/utils/seed.util";
// Data
const data = [
  {
    name: "Get a shower",
    completed: true
  },
  {
    name: "Have breakfast",
    completed: false
  },
  {
    name: "Go to work",
    completed: false
  }
];

export default async () => await many(TodoModel, data);
