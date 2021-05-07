const mongoose = require("mongoose");

const Brand = new mongoose.Schema({
  brandName: {
    type: String,
    required: true,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Items" }],
});
module.exports = mongoose.model("Brands", Brand);
