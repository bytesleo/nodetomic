/**
 * GET /api/*
 * @summary Generic errors thrown inside controllers
 * @tags *Generic Errors
 * @security JWT
 * @return {object} 5XX - Error
 * @example response - 5XX - ERROR_PARAMS_1
 * {
 *   "err": {
 *       "code": "ERROR_PARAMS_1",
 *       "message": "Unauthorized due to lack of required data..."
 *   }
 * }
 * @example response - 5XX - ERROR_PARAMS_2
 * {
 *   "err": {
 *       "code": "ERROR_PARAMS_2",
 *       "message": "Unauthorized due to data not being in expected format..."
 *   }
 * }
 * @example response - 5XX - ERROR_AUTH_3
 * {
 *   "err": {
 *       "code": "ERROR_AUTH_3",
 *       "message": "The User id cannot be empty"
 *   }
 * }
 * @example response - 5XX - ERROR_AUTH_4
 * {
 *   "err": {
 *       "code": "ERROR_AUTH_4",
 *       "message": "Invalid auth User id..."
 *   }
 * }
 */
