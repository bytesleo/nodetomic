// Controllers
import UserController from "@/controllers/user.controller";
// Utils
import { mw } from "@/utils/middleware.util";

export default app => {
  app.put("/api/user/update", mw(["user"]), UserController.update);
};
