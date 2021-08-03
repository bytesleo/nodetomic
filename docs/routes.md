---
title: Routes
parent: API
has_children: false
nav_order: 1
---

# Routes

```javascript
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
 *     "_id":"60d200765299bd36806d8999",
 *     "name":"Sparky",
 *     "race":"Beagle",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.521Z"
 *   },
 *   {
 *     "_id":"60d200765299bd36806d899a",
 *     "name":"Zeus",
 *     "race":"Chihuahua",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.522Z"
 *   },
 *   {
 *     "_id":"60d200765299bd36806d899b",
 *     "name":"Poseidon",
 *     "race":"Bulldog",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.523Z"
 *   }
 * ]
 */
router.get('/api/dogs/all', DogsController.getAll);

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
 *     "_id":"60d200765299bd36806d8999",
 *     "name":"Sparky",
 *     "race":"Beagle",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.521Z"
 *   },
 *   {
 *     "_id":"60d200765299bd36806d899a",
 *     "name":"Zeus",
 *     "race":"Chihuahua",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.522Z"
 *   },
 *   {
 *     "_id":"60d200765299bd36806d899b",
 *     "name":"Poseidon",
 *     "race":"Bulldog",
 *     "user_id": "6108db02bb8ea9e69b2984a2",
 *     "created_at":"2021-06-22T15:23:34.523Z"
 *   }
 * ]
 */
router.get('/api/dogs/all/logged', mw(['user']), DogsController.getAllLogged);

export default router;
```
