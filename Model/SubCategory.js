const mongoose = require("mongoose");

const SubCategory = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
});
module.exports = mongoose.model("SubCategories", SubCategory);
