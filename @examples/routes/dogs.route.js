import express from "express";
// Controllers
import DogsController from "@/controllers/dogs.controller";
// Utils
import { mw } from "@/utils/middleware.util";
// Constants
const router = express.Router();

/**
 * Get all dogs
 * @route GET /api/dogs/all
 * @group Dogs
 * @returns {object} 200 - success
 * @returns {Error} 5XX - error
 */
router.get("/api/dogs/all", DogsController.all);

/**
 * Get all dogs (logged)
 * @route GET /api/dogs/all/logged
 * @security JWT
 * @group Dogs
 * @returns {object} 200 - success
 * @returns {object} 401 - unauthorized
 * @returns {object} 403 - forbidden
 * @returns {Error} 5XX - error
 */
router.get("/api/dogs/all/logged", mw(["user"]), DogsController.all);

export default router;
