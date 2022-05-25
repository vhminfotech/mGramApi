const mongoose = require("mongoose");
const { Schema } = mongoose;

exports.ConfigValueSchema = new Schema(
  {
    configName: { type: String },
    configValue: { type: String },
  },
  {
    timestamps: true,
  }
);
