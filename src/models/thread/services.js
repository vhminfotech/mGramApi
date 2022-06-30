const Thread = require("./index");

exports.getById = async (id) => {
  try {
    const thread = await Thread.findById({ _id: id });
    return thread;
  } catch (error) {
    throw error;
  }
};

exports.create = async (operatorData) => {
  try {
    const thread = await Thread.create(operatorData);
    return thread;
  } catch (error) {
    throw error;
  }
};

exports.getThread = async (data) => {
  try {
    const thread = await Thread.findOne(data);
    return thread;
  } catch (error) {
    throw error;
  }
};

exports.getAllThread = async (userId) => {
  try {
    const thread = await Thread.find({ lastSenderId: userId });
    return thread;
  } catch (error) {
    throw error;
  }
};

exports.getAll = async (data) => {
  try {
    const thread = await Thread.find(data).sort({ createdAt: -1 });
    return thread;
  } catch (error) {
    throw error;
  }
};

exports.update = async (threadId, updateObject) => {
  try {
    const thread = await Thread.updateOne(
      { _id: threadId },
      { $push: { deletedForUser: [updateObject] } },
      { new: true }
    );
    return thread;
  } catch (error) {
    throw error;
  }
};

exports.updateOne = async (threadId, updateObject) => {
  try {
    const thread = await Thread.updateOne(
      { _id: threadId },
      {
        $pullAll: {
          deletedForUser: [updateObject],
        },
      },
      { new: true }
    );
    return thread;
  } catch (error) {
    throw error;
  }
};

exports.updateIsAdmin = async (threadId, updateObject) => {
  try {
    const thread = await Thread.updateOne(
      { _id: threadId },
      { $push: { isGroupAdmin: [updateObject] } },
      { new: true }
    );
    return thread;
  } catch (error) {
    throw error;
  }
};


exports.updateIsParticipant = async (threadId, updateObject) => {
  try {
    const thread = await Thread.updateOne(
      { _id: threadId },
      { $push: { isNotParticipants: [updateObject] } },
      { new: true }
    );
    return thread;
  } catch (error) {
    throw error;
  }
};

exports.updateAdminByDeleteAdmin = async (threadId, updateObject) => {
  try {
    const thread = await Thread.updateOne(
      { _id: threadId },
      { $pullAll: { isGroupAdmin: [updateObject] } },
      { new: true }
    );
    return thread;
  } catch (error) {
    throw error;
  }
};

exports.getThreadAdmin = async (data, dataObj) => {
  try {
    const thread = await Thread.findOne(data, dataObj);
    return thread;
  } catch (error) {
    throw error;
  }
};