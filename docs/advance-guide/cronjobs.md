---
title: Cronjobs
parent: Advance Guide
has_children: false
nav_order: 3
---

# Cronjobs

```javascript
// Models
import DogsBusiness from '@/business/dogs.business';
// Libs
import cron from 'node-cron';

// Execute At minute 7 past every 6th hour.
cron.schedule('07 */6 * * *', async () => {
  await DogsBusiness.getAll();
});
```
