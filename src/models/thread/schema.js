const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { MONGOOSE_MODEL } = require("../constant");

const threadSchema = new mongoose.Schema(
  {
    lastSenderId: { type: Schema.Types.ObjectId, ref: MONGOOSE_MODEL.USER },
    message: { type: String },
    messageId: { type: Schema.Types.ObjectId, ref: MONGOOSE_MODEL.MESSAGE },
    date: { type: String },
    recipientsIds: { type: [Schema.Types.ObjectId], ref: MONGOOSE_MODEL.USER },
    currentUser: { type: Number },
    unreadCount: { type: Number },
    recipientsCount: { type: Number },
    recipientUser: { type: String },
    isGroup: { type: Boolean, default: false },
    groupName: { type: String },
    deletedForUser: { type: [String] },
    mutedForUser: { type: [Schema.Types.ObjectId], ref: MONGOOSE_MODEL.USER },
    isGroupAdmin: { type: [String] },
    isNotParticipants: { type: [String] }
  },
  {
    timestamps: true,
  }
);

module.exports = threadSchema;
