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
