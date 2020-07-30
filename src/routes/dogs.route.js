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
 * @returns {Error} 500 - error
 */
router.get("/api/dogs/all", DogsController.all);

/**
 * Get all dogs (logged)
 * @route GET /api/dogs/all/logged
 * @security JWT
 * @group Dogs
 * @returns {object} 200 - success
 * @returns {Error} 500 - error
 */
router.get("/api/dogs/all/logged", mw(["user"]), DogsController.all);

export default router;

// Examples

// * Form Parameters
// @route POST /api/dogs/create
// @param {string} dogName.formData.required - dog name

// * Path Parameters
// @route GET /api/dogs/{dogId}
// @param {string} dogId.path.required - dog id

// * Query Parameters
// @route GET /api/dogs/filter?status=available
// @param {string} status.query.required - filter by status

// * Header Parameters
// @route GET /api/dogs
// @param {string} headerId.header.required - header id

// * Code status
// @returns {object} 200 - success
// @returns {object} 400 - bad request
// @returns {object} 401 - unauthorized
// @returns {object} 403 - forbidden
// @returns {object} 404 - not found
// @returns {object} 405 - unsupported action
// @returns {object} 422 - invalid
// @returns {Error} 500 - error

// https://swagger.io/docs/specification/describing-parameters
