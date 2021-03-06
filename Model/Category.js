const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }],
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategories" }],
});
module.exports = mongoose.model("Categories", Category);
