const mongoose = require("mongoose");
const { ConfigValueSchema } = require("./utils");

const appConfigSchema = new mongoose.Schema(
  {
    operatorId: { type: String },
    appConfigs: { type: [ConfigValueSchema] },
  },
  {
    timestamps: true,
  }
);

module.exports = appConfigSchema;
