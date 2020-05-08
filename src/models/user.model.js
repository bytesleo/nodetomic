import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import bcrypt from "bcrypt";

// Schema
const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  name: {
    type: String,
    default: null
  },
  last_name: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  password: {
    type: String,
    select: false,
    default: null
  },
  permissions: {
    type: Array,
    default: ["user"]
  },
  code_verification: {
    type: String,
    default: null
  },
  enabled: {
    type: Boolean,
    default: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Plugins
Schema.plugin(mongoosePaginate);

// Statics
Schema.statics.compare = async (candidatePassword, password) => {
  return await bcrypt.compareSync(candidatePassword, password);
};

// Hooks
Schema.pre("save", async function() {
  const user = this;
  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, 10);
    user.password = hash;
  }
});

Schema.pre("updateOne", async function() {
  const user = this._update;
  if (user.password) {
    const hash = await bcrypt.hashSync(user.password, 10);
    this._update.password = hash;
  }
});

const Model = mongoose.model("User", Schema);

export default Model;
