// Models
import TodoModel from "@/models/todo.model";
// Utils
import { many } from "@/utils/seed.util";
// Data
const data = [
  {
    title: "Get a shower",
    completed: true
  },
  {
    title: "Have breakfast",
    completed: false
  },
  {
    title: "Go to work",
    completed: false
  }
];

export default async () => await many(TodoModel, data);
