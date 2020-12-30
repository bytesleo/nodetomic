---
title: API
has_children: true
nav_order: 2
---

### Flux

Routes-> Controllers -> Business -> Models

### Routes

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
 */
router.get('/api/dogs/all', DogsController.allDogs);

export default router;
```

### Controllers

```javascript
// Business
import DogBusiness from '@/business/dogs.business';
// Utils
import { success, error } from '@/utils/helper.util';

const allDogs = async (req, res) => {
  try {
    // If have middleware in route, you can access to user id:
    // const userId = req.user.id;
    const data = await DogBusiness.allDogs();
    success(res, data);
  } catch (err) {
    error(res, err);
  }
};

export default { allDogs };
```

### Business

```javascript
// Models
import DogsModel from '@/models/dogs.model';

const allDogs = async () => {
  return await DogsModel.find({});
};

export default {
  allDogs
};
```

### Models

```javascript
// Libs
import { Schema, model } from 'mongoose';

// Schema
const schema = new Schema({
  name: {
    type: String,
    default: null
  },
  race: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Model = model('Dog', schema);

export default Model;
```
