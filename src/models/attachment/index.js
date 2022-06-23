const mongoose = require("mongoose");
const attachmentSchema = require("./schema");

const Attachment = mongoose.model("Attachment", attachmentSchema);

module.exports = Attachment;
