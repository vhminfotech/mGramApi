const jwt = require("jsonwebtoken");
const User = require("../../models/user/services");
const Operator = require("../../models/operator/services");

exports.getToken = (name, MSISDN) => {
  const token = jwt.sign(
    { name: name, MSISDN: MSISDN },
    process.env.SECRET_KEY,
    {
      expiresIn: "3h",
    }
  );
  return token;
};

exports.createUser = async (name, operatorId, MSISDN) => {
  try {
    const operator = await Operator.getOperator({
      operatorId: operatorId,
    });

    console.log("operator", operator);

    const userData = await User.create({
      name: name,
      operator: operator.name,
      MSISDN: MSISDN,
    });

    const userDataRes = {
      name: userData.name,
      userId: userData._id,
      MSISDN: userData.MSISDN,
      operator: userData.operator,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      lastActive: null,
      userStatus: 1,
    };

    const token = this.getToken(userData.name, userData.MSISDN);
    return {
      messege: "User Registred Successfully",
      token,
      status: 1,
      userData: userDataRes,
    };
  } catch (error) {
    console.log(error);
  }
};
