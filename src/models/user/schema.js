const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    otp: { type: Number },
    otpDateTime: { type: String },
    operator: { type: Number },
    deletedAt: { type: Date },
    MSISDN: { type: String },
  },
  {
    timestamps: true,
  }
);
