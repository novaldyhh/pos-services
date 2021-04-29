const mongoose = require("mongoose");
const rel = mongoose.Schema.Types.ObjectId;

const Role = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Roles", Role);
