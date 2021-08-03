import mongoose, { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import AutoIncrement from 'mongoose-sequence';
import bcrypt from 'bcrypt';

// Schema
const schema = new Schema({
  id: {
    type: Number,
    default: null
  },
  phone: {
    type: String,
    trim: true,
    uppercase: true,
    index: { unique: true }
  },
  email: {
    type: String,
    trim: true,
    uppercase: true,
    index: { unique: true }
  },
  name: {
    type: String,
    uppercase: true,
    trim: true,
    default: null
  },
  last_name: {
    type: String,
    uppercase: true,
    trim: true,
    default: null
  },
  password: {
    type: String,
    select: false,
    default: null
  },
  permissions: {
    type: Array,
    default: ['user']
  },
  code_verification: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date,
    default: null
  }
});

// Plugins
schema.plugin(aggregatePaginate);
schema.plugin(AutoIncrement(mongoose), { id: 'user_seq', inc_field: 'id' });

// Statics
schema.statics.compare = async (candidatePassword, password) => {
  return await bcrypt.compareSync(candidatePassword, password);
};

// Hooks
schema.pre('save', async function () {
  const user = this;
  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, 10);
    user.password = hash;
  }
});

schema.pre('updateOne', async function () {
  const user = this._update;
  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, 10);
    this._update.password = hash;
  }
});

schema.pre('updateMany', async function () {
  const user = this._update;
  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, 10);
    this._update.password = hash;
  }
});

// Indexes
schema.index({ id: 1 });

const Model = model('User', schema);

export default Model;
