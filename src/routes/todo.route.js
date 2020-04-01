import express from "express";
// Controllers
import TodoController from "@/controllers/todo.controller";
// Constants
const router = express.Router();

router.get("/api/todo/all", TodoController.all);
router.post("/api/todo/create", TodoController.create);
router.get("/api/todo/read/:id", TodoController.read);
router.put("/api/todo/update/:id", TodoController.update);
router.delete("/api/todo/remove/:id", TodoController.remove);

export default router;
