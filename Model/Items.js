const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Item = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
    },
    barcode: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
    },
    totalValue: {
      type: Number,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branches",
      required: true,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Suppliers",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Items", Item);
