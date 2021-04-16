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
    required: true,
  },
  password: {
    type: String,
    required: true,
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
  roles: {
    type: rel,
    ref: "Roles",
  },
});

module.exports = mongoose.model("Users", User);
