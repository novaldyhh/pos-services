const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Supplier = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  supplier: [
    {
      type: Schema.Types.ObjectId,
      ref: "Items",
      required: true,
    },
  ],
});
module.exports = mongoose.model("Suppliers", Supplier);
