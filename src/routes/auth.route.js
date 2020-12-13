import express from "express";
// Controllers
import AuthController from "@/controllers/auth.controller";
// Utils
import { mw } from "@/utils/middleware.util";
// Constants
const router = express.Router();

/**
 * POST /api/auth/login
 * @summary Login user
 * @tags Auth
 * @param {string} username.form.required - email or phone
 * @param {string} password.form.required - user's password
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.post("/api/auth/login", AuthController.login);

/**
 * POST /api/auth/register
 * @summary Register user
 * @tags Auth
 * @param {string} username.form.required - email or phone
 * @param {string} password.form.required - user's password
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.post("/api/auth/register", AuthController.register);

/**
 * POST /api/auth/recover
 * @summary Recover password
 * @tags Auth
 * @param {string} username.form.required - email or phone
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.post("/api/auth/recover", AuthController.recover);

/**
 * GET /api/auth/me
 * @summary Get current
 * @tags Auth
 * @security JWT
 * @return {object} 200 - Success
 * @return {object} 401 - Unauthorized
 * @return {object} 403 - Forbidden
 * @return {object} 5XX - Error
 */
router.get("/api/auth/me", mw(["user"]), AuthController.me);

/**
 * POST /api/auth/verify
 * @summary Verify account
 * @tags Auth
 * @param {string} username.form.required - email or phone
 * @param {string} code.form.required - code
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.post("/api/auth/verify", AuthController.verify);

export default router;
