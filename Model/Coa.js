const mongoose = require("mongoose");

const Coa = new mongoose.Schema({
  coaName: {
    type: String,
    required: true,
  },
  coaCategoryName: {
    type: String,
    required: true,
  },
  coaCode: {
    type: String,
    required: true,
  },
  coaCategory: { type: mongoose.Schema.Types.ObjectId, ref: "CoaCategories" },
  Purchase: [{ type: mongoose.Schema.Types.ObjectId, ref: "Purchases" }],
  productCategory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
  ],
});
module.exports = mongoose.model("Coas", Coa);
