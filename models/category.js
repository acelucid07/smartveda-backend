const mongoose = require("mongoose");
const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    Id: { type: Number, index: true, unique: true },
    name: { type: String, lowercase: true },
    parentCategoryName: { type: String, lowercase: true },
    status: { type: Boolean },
    image: { type: Number },
    description: { type: String },
    meta_description: {
      meta_title: { type: String },
      meta_descrip: { type: String },
      meta_keyword: { type: String },
    },
  },
  {
    timestamps: false,
    collection: "category",
  }
);
  module.exports = mongoose.model("Category", categorySchema)