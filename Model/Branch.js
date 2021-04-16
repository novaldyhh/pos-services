const mongoose = require("mongoose");
const rel = mongoose.Schema.Types.ObjectId;

const Branch = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  isMainBranch: {
    type: String,
    required: true,
  },
  users: [
    {
      type: rel,
      ref: "Users",
    },
  ],
});
module.exports = mongoose.model("Branches", Branch);
