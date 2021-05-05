const mongoose = require("mongoose");
const rel = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    max: 1000,
  },
  name: {
    type: String,
    required: true,
  },
  branch: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branches",
    },
  ],
  role: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
    },
  ],
});

module.exports = mongoose.model("Users", User);
