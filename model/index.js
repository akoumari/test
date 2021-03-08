const mongoose = require("mongoose");

const userSchema = require("./user");
const roomSchema = require("./room");
const messageSchema = require("./message");

module.exports = {
  User: mongoose.model("User", userSchema),
  Room: mongoose.model("Room", roomSchema),
  Message: mongoose.model("Message", messageSchema),
};
