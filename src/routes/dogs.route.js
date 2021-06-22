import express from 'express';
// Controllers
import DogsController from '@/controllers/dogs.controller';
// Utils
import { mw } from '@/utils/middleware.util';
// Constants
const router = express.Router();

/**
 * GET /api/dogs/all
 * @summary Get all dogs
 * @tags Dogs
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 * @example response - 200 - success response example
 * [
 *   {
 *     "name":"Sparky",
 *     "race":"Beagle",
 *     "_id":"60d200765299bd36806d8999",
 *     "created_at":"2021-06-22T15:23:34.521Z"
 *   },
 *   {
 *     "name":"Zeus",
 *     "race":"Chihuahua",
 *     "_id":"60d200765299bd36806d899a",
 *     "created_at":"2021-06-22T15:23:34.522Z"
 *   },
 *   {
 *     "name":"Poseidon",
 *     "race":"Bulldog",
 *     "_id":"60d200765299bd36806d899b",
 *     "created_at":"2021-06-22T15:23:34.523Z"
 *   }
 * ]
 */
router.get('/api/dogs/all', DogsController.all);

/**
 * GET /api/dogs/all/logged
 * @summary  Get all dogs (logged)
 * @security JWT
 * @tags Dogs
 * @return {object} 200 - Success
 * @return {object} 401 - Unauthorized
 * @return {object} 403 - Forbidden
 * @return {object} 5XX - Error
 * @example response - 200 - success response example
 * [
 *   {
 *     "name":"Sparky",
 *     "race":"Beagle",
 *     "_id":"60d200765299bd36806d8999",
 *     "created_at":"2021-06-22T15:23:34.521Z"
 *   },
 *   {
 *     "name":"Zeus",
 *     "race":"Chihuahua",
 *     "_id":"60d200765299bd36806d899a",
 *     "created_at":"2021-06-22T15:23:34.522Z"
 *   },
 *   {
 *     "name":"Poseidon",
 *     "race":"Bulldog",
 *     "_id":"60d200765299bd36806d899b",
 *     "created_at":"2021-06-22T15:23:34.523Z"
 *   }
 * ]
 */
router.get('/api/dogs/all/logged', mw(['user']), DogsController.allLogged);

export default router;
