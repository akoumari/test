const mongoose = require("mongoose");
import dotenv from "dotenv"
dotenv.config()
const dbUrl = process.env.MONGO_URI;

const connect =mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log(`MongoDB connected`);
    //makeData();
  })
  .catch((err) => console.log(`MongoDB connection FAILED`, err));

module.exports = connect;