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
});
module.exports = mongoose.model("Branches", Branch);
