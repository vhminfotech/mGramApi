const mongoose = require("mongoose");
const messageSchema = require("./schema");

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
