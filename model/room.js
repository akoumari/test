const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = require("./message");

const roomSchema = new Schema(
    {
        roomName:{type: Schema.Types.String, require: true },  
        activeSockets:[{type: Schema.Types.String}]     ,
      messageLog: [messageSchema],
      activeUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
      


    },
    { timestamps: true }
  );
  module.exports = roomSchema;