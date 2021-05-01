const mongoose = require("mongoose");

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
});
module.exports = mongoose.model("Suppliers", Supplier);
