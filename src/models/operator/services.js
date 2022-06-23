const Operator = require("./index");

exports.getById = async (id) => {
  try {
    const operator = await Operator.create();
    return operator;
  } catch (error) {
    throw error;
  }
};

exports.create = async (operatorData) => {
  try {
    const operator = await Operator.create(operatorData);
    return operator;
  } catch (error) {
    throw error;
  }
};

exports.getOperator = async (data) => {
  try {
    const operator = await Operator.findOne(data);
    return operator;
  } catch (error) {
    throw error;
  }
};
