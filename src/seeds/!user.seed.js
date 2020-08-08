// Models
import UserModel from "@/models/user.model";
// Utils
import { once } from "@/utils/seed.util";
// Data
const data = {
  name: "User",
  last_name: "Example",
  phone: "123456789",
  email: "user@example.com",
  password: "123",
  permissions: ["user"]
};

export default async () => await once(UserModel, data);
