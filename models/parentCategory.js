const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const parentCategorySchema = new Schema(
  {
    Id: { type: Number, index: true, unique: true },
    Name: { type: String , lowercase:true},
    categoryId: { 
        type:[Schema.Types.ObjectId]
      }
  },
  {
    timestamps: false,
    collection: "parentcategory",
  }
);
module.exports = mongoose.model("ParentCategory", parentCategorySchema);
