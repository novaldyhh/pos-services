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
    },
    minimumStock: {
      type: Number,
      required: true,
    },
    basicPrice: {
      type: Number,
    },
    price: {
      type: Number,
    },
    totalValue: {
      type: Number,
    },
    brand: {
      type: String,
    },
    categoryName: {
      type: String,
    },
    coaName: {
      type: String,
    },
    supplierName: {
      type: String,
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branches",
      required: true,
    },
    coa: {
      type: Schema.Types.ObjectId,
      ref: "Suppliers",
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Suppliers",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Items", Item);
