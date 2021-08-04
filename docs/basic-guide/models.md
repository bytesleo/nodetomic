---
title: Models
parent: Basic Guide
has_children: false
nav_order: 1
---

# Models

```javascript
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
  user_id: {
    type: Schema.Types.ObjectId,
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
