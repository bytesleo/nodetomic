import express from "express";
// Controllers
import AuthController from "@/controllers/auth.controller";
// Utils
import { mw } from "@/utils/middleware.util";
// Constants
const router = express.Router();

router.post("/api/auth/login", AuthController.login);
router.post("/api/auth/register", AuthController.register);
router.post("/api/auth/recover", AuthController.recover);
router.get("/api/auth/me", mw(["user"]), AuthController.me);
router.post("/api/auth/verify", AuthController.verify);

export default router;
