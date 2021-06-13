const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Customer = new mongoose.Schema({
  customerName: {
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
  branch: {
    type: Schema.Types.ObjectId,
    ref: "Branches",
  },
});
module.exports = mongoose.model("Customers", Customer);
