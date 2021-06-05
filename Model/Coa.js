const mongoose = require("mongoose");

const Coa = new mongoose.Schema({
  coaName: {
    type: String,
    required: true,
  },
  coaCode: {
    type: Number,
    required: true,
    default: 0,
  },
  Purchase: [{ type: mongoose.Schema.Types.ObjectId, ref: "Purchases" }],
});
module.exports = mongoose.model("Coas", Coa);
