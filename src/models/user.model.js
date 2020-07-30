import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import bcrypt from "bcrypt";

// Schema
const schema = new Schema({
  phone: {
    type: String,
    required: true,
    index: { unique: true },
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  name: {
    type: String,
    default: null,
  },
  last_name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    select: false,
    default: null,
  },
  permissions: {
    type: Array,
    default: ["user"],
  },
  code_verification: {
    type: String,
    default: null,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Plugins
schema.plugin(mongoosePaginate);

// Statics
schema.statics.compare = async (candidatePassword, password) => {
  return await bcrypt.compareSync(candidatePassword, password);
};

// Hooks
schema.pre("save", async function () {
  const user = this;
  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, 10);
    user.password = hash;
  }
});

schema.pre("updateOne", async function () {
  const user = this._update;
  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, 10);
    this._update.password = hash;
  }
});

const Model = model("User", schema);

export default Model;
