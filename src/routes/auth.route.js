import express from "express";
// Controllers
import AuthController from "@/controllers/auth.controller";
// Utils
import { mw } from "@/utils/middleware.util";
// Constants
const router = express.Router();

/**
 * Login user
 * @route POST /api/auth/login
 * @group Auth
 * @param {string} username.formData.required - email or phone
 * @param {string} password.formData.required - user's password
 * @returns {object} 200 - success
 * @returns {Error} 500 - error
 */
router.post("/api/auth/login", AuthController.login);

/**
 * Register user
 * @route POST /api/auth/register
 * @group Auth
 * @param {string} username.formData.required - email or phone
 * @param {string} password.formData.required - user's password
 * @returns {object} 200 - success
 * @returns {Error} 500 - error
 */
router.post("/api/auth/register", AuthController.register);

/**
 * Recover account
 * @route POST /api/auth/recover
 * @group Auth
 * @param {string} username.formData.required - email or phone
 * @returns {object} 200 - success
 * @returns {Error} 500 - error
 */
router.post("/api/auth/recover", AuthController.recover);

/**
 * Get current user
 * @route GET /api/auth/me
 * @security JWT
 * @group Auth
 * @returns {object} 200 - success
 * @returns {object} 401 - unauthorized
 * @returns {object} 403 - forbidden
 * @returns {Error} 500 - error
 */
router.get("/api/auth/me", mw(["user"]), AuthController.me);

/**
 * Verify account
 * @route POST /api/auth/verify
 * @group Auth
 * @param {string} username.formData.required - email or phone
 * @param {number} code.formData.required - code
 * @returns {object} 200 - success
 * @returns {Error} 500 - error
 */
router.post("/api/auth/verify", AuthController.verify);

export default router;
