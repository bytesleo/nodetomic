---
title: Controllers
parent: API
has_children: false
nav_order: 2
---

# Controllers

```javascript
// Business
import DogBusiness from '@/business/dogs.business';
import { success, error } from '@/utils/helper.util';
// Libs
import validator from 'validator';

const getAll = async (req, res) => {
  try {
    // Business logic
    const data = await DogBusiness.getAll();
    // Return success
    success(res, data);
  } catch (err) {
    // Return error (if any)
    error(res, err);
  }
};

export default { getAll };
```
