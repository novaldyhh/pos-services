const mongoose = require("mongoose");

const CoaCategory = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
    default: 0,
  },
  CoaCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coas" }],
});
module.exports = mongoose.model("CoaCategories", CoaCategory);
