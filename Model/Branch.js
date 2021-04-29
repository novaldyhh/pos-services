const mongoose = require("mongoose");
const rel = mongoose.Schema.Types.ObjectId;

const Branch = new mongoose.Schema({
  branchName: {
    type: String,
    required: true,
  },
  isMainBranch: {
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
  postalCode: {
    type: String,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("Branches", Branch);
