import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Schema
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  completed: {
    type: Boolean,
    default: false
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

Schema.plugin(mongoosePaginate);

const Model = mongoose.model("Todo", Schema);

export default Model;
