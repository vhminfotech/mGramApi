const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    threadId: { type: Number },
    senderId: { type: Number },
    message: { type: String },
    dateSend: { type: String },
    isAttachment: { type: Boolean, default: false },
    attachmentId: { type: Number },
    url: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = messageSchema;
