const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema(
  {
    operatorId: { type: Number },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = operatorSchema;
