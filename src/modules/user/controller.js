const User = require("../../models/user/services");

exports.createUser = async (name) => {
  try {
    const userData = await User.create({
      name: name,
    });
    console.log("userData", userData);
    return { name };
  } catch (error) {
    console.log(error);
  }
};
