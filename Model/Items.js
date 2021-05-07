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
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brands",
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Suppliers",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategories",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Items", Item);
