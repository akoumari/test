const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userName:{type: Schema.Types.String, require: true },
        socket: {type: Schema.Types.String, require: true },
      firstName: { type: Schema.Types.String, },
      lastName: { type: Schema.Types.String, },
      email: { type: Schema.Types.String },


    },
    { timestamps: true }
  );
  module.exports = userSchema;