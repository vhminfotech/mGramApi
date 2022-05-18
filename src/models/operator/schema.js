const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    operatorId: { type: Number },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);
