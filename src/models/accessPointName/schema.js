const mongoose = require("mongoose");

const accessPointNameSchema = new mongoose.Schema(
  {
    operatorId: { type: Number },
    apnName: { type: String },
    apn: { type: String },
    proxy: { type: String },
    port: { type: String },
    userName: { type: String },
    password: { type: String },
    server: { type: String },
    mmsc: { type: String },
    mmsProxy: { type: String },
    mmsPort: { type: String },
    mcc: { type: String },
    mnc: { type: String },
    authType: { type: String },
    apnType: { type: String },
    apnProtocol: { type: String },
    apnRoaming: { type: String },
    bearer: { type: String },
    mvnoType: { type: String },
    mvnoValue: { type: String },
    bearer: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = accessPointNameSchema;
