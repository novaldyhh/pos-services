const mongoose = require("mongoose");

const Purchase = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  Coa: { type: mongoose.Schema.Types.ObjectId, ref: "Coas" },
  items: { type: mongoose.Schema.Types.ObjectId, ref: "Items" },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Suppliers" },
});
module.exports = mongoose.model("Purchases", Purchase);
