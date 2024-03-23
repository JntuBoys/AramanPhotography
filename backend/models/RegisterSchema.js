const express = require("express");
const { default: mongoose } = require("mongoose");
const UserRegistration = new mongoose.Schema({
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
  roleId: {
    type: String,
    required: true,
  },
});
module.exports = new mongoose.model("UserRegistration", UserRegistration);
