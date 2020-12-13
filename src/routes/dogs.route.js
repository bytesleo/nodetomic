import express from "express";
// Controllers
import DogsController from "@/controllers/dogs.controller";
// Utils
import { mw } from "@/utils/middleware.util";
// Constants
const router = express.Router();

/**
 * GET /api/dogs/all
 * @summary Get all dogs
 * @tags Dogs
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */
router.get("/api/dogs/all", DogsController.all);

/**
 * GET /api/dogs/all/logged
 * @summary  Get all dogs
 * @security JWT
 * @tags Dogs
 * @return {object} 200 - Success
 * @return {object} 401 - Unauthorized
 * @return {object} 403 - Forbidden
 * @return {object} 5XX - Error
 */
router.get("/api/dogs/all/logged", mw(["user"]), DogsController.all);

export default router;
