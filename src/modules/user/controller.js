const jwt = require("jsonwebtoken");
const User = require("../../models/user/services");
const Operator = require("../../models/operator/services");

exports.getToken = (name, msisdn) => {
  const token = jwt.sign(
    { name: name, msisdn: msisdn },
    process.env.SECRET_KEY,
    {
      expiresIn: "3h",
    }
  );
  return token;
};

exports.createUser = async (name, operatorId, msisdn) => {
  try {
    const operator = await Operator.getOperator({
      operatorId: operatorId,
    });

    const userData = await User.create({
      name: name,
      operator: operator.name,
      msisdn: msisdn,
    });

    const userDataRes = {
      name: userData.name,
      userId: userData._id,
      msisdn: userData.msisdn,
      operator: userData.operator,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      lastActive: null,
      userStatus: 1,
    };

    const token = this.getToken(userData.name, userData.msisdn);
    return {
      message: "User Registred Successfully",
      token,
      status: 1,
      userData: userDataRes,
    };
  } catch (error) {
    console.log(error);
  }
};
