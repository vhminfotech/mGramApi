const mongoose = require("mongoose");
const appConfigSchema = require("./schema");

const AppConfig = mongoose.model("AppConfig", appConfigSchema);

module.exports = AppConfig;
