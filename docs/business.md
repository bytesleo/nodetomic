---
title: Business
parent: API
has_children: false
nav_order: 3
---

# Business

```javascript
// Models
import DogsModel from '@/models/dogs.model';

const getAll = async () => {
  // Database query
  return await DogsModel.find({});
};

export default {
  getAll
};
```
