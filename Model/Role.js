const mongoose = require("mongoose");
const rel = mongoose.Schema.Types.ObjectId;

const Role = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});
module.exports = mongoose.model("Roles", Role);
