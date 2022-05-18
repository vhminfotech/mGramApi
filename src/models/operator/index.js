const mongoose = require("mongoose");
const operatorSchema = require("./schema");

const Operator = mongoose.model("Operator", operatorSchema);

module.exports = Operator;
