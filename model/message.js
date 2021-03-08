const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        user:{ type: Schema.Types.ObjectId, ref: "User", required: true },
        userName:{type: Schema.Types.String, required: true },
        room: { type: Schema.Types.ObjectId, ref: "Room" , required: true },
        message: { type: Schema.Types.String,  required: true },
    },
    { timestamps: true }
  );
  module.exports = userSchema;