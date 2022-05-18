const User = require("./index");

exports.getById = async (id) => {
  try {
    const userData = await create({
      email: email,
      fullName: fullName,
      password: encryPassword,
      mobile: mobile,
      role: "user",
    });
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
