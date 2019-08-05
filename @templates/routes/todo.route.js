// Controllers
import TodoController from "@/controllers/todo.controller";
// Utils
import { mw } from "@/utils/middleware.util";

export default app => {
  app.get("/api/todo/all", TodoController.all);
  app.post("/api/todo/create", TodoController.create);
  app.get("/api/todo/read/:id", TodoController.read);
  app.put("/api/todo/update/:id", TodoController.update);
  app.delete("/api/todo/remove/:id", TodoController.remove);
  app.get("/api/todo/secret", mw(["admin"]), TodoController.protected);
};
