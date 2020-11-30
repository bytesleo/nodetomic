```javascript

/**
 * Form Parameter
 * @route POST /api/dogs/create
 * @group Dogs
 * @param {string} dogName.formData.required - dogName
 * @returns {object} 200 - success
 * @returns {Error} 5XX - error
 */

/**
 * Path Parameter
 * @route GET /api/dogs/{dogId}
 * @group Dogs
 * @param {string} dogId.path.required - dogId
 * @returns {object} 200 - success
 * @returns {Error} 5XX - error
 */

/**
 * Query Parameter
 * @route GET /api/dogs/filter?status=available
 * @group Dogs
 * @param {string} status.query.required - status
 * @returns {object} 200 - success
 * @returns {Error} 5XX - error
 */

/**
 * Body Parameter
 * @route POST /api/dogs/filter
 * @group Dogs
 * @param {object} status.body.required - status
 * @returns {object} 200 - success
 * @returns {Error} 5XX - error
 */

/**
 * Header Parameter
 * @route GET /api/dogs
 * @group Dogs
 * @param {object} headerId.header.required - headerId
 * @returns {object} 200 - success
 * @returns {Error} 5XX - error
 */

/**
 * Array Parameter
 * @route GET /api/dogs
 * @group Dogs
 * @param {Array<string>} tags.body.required
 * @returns {object} 200 - success
 * @returns {Error} 5XX - error
 */

/**
 * Code Status
 * @route GET /api/dogs
 * @group Dogs
 * @returns {object} 200 - success
 * @returns {Error} 5XX - error
 * @returns {object} 400 - bad request
 * @returns {object} 401 - unauthorized
 * @returns {object} 403 - forbidden
 * @returns {object} 404 - not found
 * @returns {object} 405 - unsupported action
 * @returns {object} 422 - invalid
 * @returns {Error} 5XX - error
 */

```

<https://swagger.io/docs/specification/describing-parameters>

