const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    otp: { type: Number },
    otpDateTime: { type: String },
    operator: { type: String },
    deletedAt: { type: Date },
    msisdn: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
