const Operator = require("../../models/operator/services");

exports.createOperator = async (name, operatorId) => {
  try {
    const operatorData = await Operator.create({
      name: name,
      operatorId: operatorId,
    });

    return { name: operatorData.name, operatorId: operatorData.operatorId };
  } catch (error) {
    throw error;
  }
};
