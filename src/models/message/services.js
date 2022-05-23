const Message = require("./index");

exports.getById = async (id) => {
  try {
    const message = await Message.create();
    return message;
  } catch (error) {
    throw error;
  }
};

exports.create = async (operatorData) => {
  try {
    const message = await Message.create(operatorData);
    return message;
  } catch (error) {
    throw error;
  }
};

exports.getMessage = async (data) => {
  try {
    const message = await Message.findOne(data);
    return message;
  } catch (error) {
    throw error;
  }
};
