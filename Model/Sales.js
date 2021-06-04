const mongoose = require("mongoose");

const Sale = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  items: { type: mongoose.Schema.Types.ObjectId, ref: "Items" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  sales: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});
module.exports = mongoose.model("Sales", Sale);
