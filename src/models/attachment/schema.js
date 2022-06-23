const mongoose = require("mongoose");
const { MONGOOSE_MODEL } = require("../constant");
const { ATTACHMENT_TYPE } = require("./constants");
const Schema = mongoose.Schema;

const attachmentSchema = new mongoose.Schema(
  {
    messageId: {
      type: Schema.Types.ObjectId,
      ref: MONGOOSE_MODEL.MESSAGE,
    },
    attachmentType: { type: String, enum: ATTACHMENT_TYPE, default: "text" },
    url: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = attachmentSchema;
