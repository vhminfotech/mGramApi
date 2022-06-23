const Message = require("./index");

exports.getAllMessage = async (ObjData) => {
  try {
    const message = await Message.find(ObjData).sort({ createdAt: -1 });
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

exports.getAll = async (ObjData) => {
  try {
    const message = await Message.find(ObjData).sort({ createdAt: -1 });
    return message;
  } catch (error) {
    throw error;
  }
};

exports.update = async (messageId, updateObject) => {
  try {
    const message = await Message.updateOne(
      { _id: messageId },
      { $push: { deletedForUser: [updateObject] } }
    );
    return message;
  } catch (error) {
    throw error;
  }
};


exports.updateAllMessage = async (threadId, updateObject) => {
  try {
    const message = await Message.updateMany(
      { threadId: threadId },
      { $push: { deletedForUser: [updateObject] } }
    );
    return message;
  } catch (error) {
    throw error;
  }
};