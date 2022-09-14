const User = require("./index");

exports.getById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

exports.create = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw error;
  }
};

exports.getUser = async (data) => {
  try {
    const user = await User.findOne(data);
    return user;
  } catch (error) {
    throw error;
  }
};


exports.update = async (userId, updateObject) => {
  try {
    const user = await User.updateOne(
      { _id: userId },
      { $push: { blockdUser: [updateObject] } }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

exports.updateToDelete = async (userId, updateObject) => {
  try {

    const user = await User.updateOne(
      { _id: userId },
      { $pullAll: { blockdUser: [updateObject] } }
    );
    return user;
  } catch (error) {
    throw error;
  }
};
