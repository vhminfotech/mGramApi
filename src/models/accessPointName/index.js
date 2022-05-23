const mongoose = require("mongoose");
const accessPointNameSchema = require("./schema");

const AccessPointName = mongoose.model(
  "AccessPointName",
  accessPointNameSchema
);

module.exports = AccessPointName;
