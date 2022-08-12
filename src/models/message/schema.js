const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { MONGOOSE_MODEL } = require("../constant");

const messageSchema = new mongoose.Schema(
  {
    threadId: { type: Schema.Types.ObjectId, ref: MONGOOSE_MODEL.THREAD },
    senderId: { type: Schema.Types.ObjectId, ref: MONGOOSE_MODEL.USER },
    message: { type: String },
    dateSend: { type: String },
    isAttachment: { type: Boolean, default: false },
    attachmentId: {
      type: Schema.Types.ObjectId,
      ref: MONGOOSE_MODEL.ATTACHMENT,
    },
    url: { type: String },
    isDeleted: { type: Boolean, default: false },
    deletedForUser: { type: [String], default: [] },
    isForwarded: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = messageSchema;
