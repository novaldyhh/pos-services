const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Branch = new mongoose.Schema({
  branchName: {
    type: String,
    required: true,
  },
  isMainBranch: {
    type: Boolean,
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
  users: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  items: [{ type: Schema.Types.ObjectId, ref: "Items" }],
});

module.exports = mongoose.model("Branches", Branch);
