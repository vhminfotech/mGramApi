require("dotenv").config();
const mongoose = require("mongoose");

const connectToDB = () =>
  mongoose
    .connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("connected to mongodb"))
    .catch(console.error);

module.exports = connectToDB;
