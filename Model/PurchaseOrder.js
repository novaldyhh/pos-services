const mongoose = require("mongoose");

const PurchaseOrder = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  poCode: {
    type: String, //PO + unique code year+month+sequenceID
    required: true,
  },
  note: {
    type: String,
  },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Items" },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branches" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});
module.exports = mongoose.model("PurchaseOrders", PurchaseOrder);
