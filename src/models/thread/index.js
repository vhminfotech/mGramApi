const mongoose = require("mongoose");
const threadSchema = require("./schema");

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
