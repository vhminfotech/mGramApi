const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    otp: { type: Number },
    otpDateTime: { type: String },
    operator: { type: String },
    deletedAt: { type: Date },
    msisdn: { type: String, trim: true },
    blockdUser: { type: [String], default: [] },
    otp: {
      expiry: { type: Date },
      value: { type: String }
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ msisdn: 1 }, { unique: true });

module.exports = userSchema;
