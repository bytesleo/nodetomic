// Controllers
import AuthController from "@/controllers/auth.controller";
// Utils
import { mw } from "@/utils/middleware.util";

export default app => {
  app.post("/api/auth/login", AuthController.login);
  app.post("/api/auth/register", AuthController.register);
  app.post("/api/auth/recover", AuthController.recover);
  app.get("/api/auth/me", mw(["user"]), AuthController.me);
  app.post("/api/auth/verify", AuthController.verify);
};
