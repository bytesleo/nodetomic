---
title: Swagger
parent: Advance Guide
has_children: false
nav_order: 4
---

# Swagger

```javascript
// Body Parameter

/**
 * POST /api/dogs/create
 * @summary get dogs
 * @tags Dogs
 * @param {string} name.form.required - dog name
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */

// Path Parameter

/**
 * GET /api/dogs/{dogId}
 * @summary get dog by id
 * @tags Dogs
 * @param {string} dogId.path.required - dogId
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */

// Query Parameter

/**
 * GET /api/dogs/filter?status=available
 * @summary get dogs by query
 * @tags Dogs
 * @param {string} status.query.required - status
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */

//  Header Parameter
/**
 * GET /api/dogs
 * @summary with header param
 * @tags Dogs
 * @param {object} headerId.header.required - headerId
 * @return {object} 200 - Success
 * @return {object} 5XX - Error
 */

/**
 * Code Status
 * GET /api/dogs
 * @tags Dogs
 * @return {object} 200 - Success
 * @return {object} 400 - Bad request
 * @return {object} 401 - Unauthorized
 * @return {object} 403 - Forbidden
 * @return {object} 404 - Not found
 * @return {object} 405 - Unsupported action
 * @return {object} 422 - Invalid
 * @return {object} 5XX - Error
 */
```

<https://github.com/BRIKEV/express-jsdoc-swagger>
<https://jsdoc.app/>
