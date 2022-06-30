const jwt = require("jsonwebtoken");
const User = require("../../models/user/services");
const Operator = require("../../models/operator/services");
const Thread = require("../../models/thread/services");
const { messages } = require("../../utils/message");
const { deleteOne } = require("../../models/thread");

//create token
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

// signup user
exports.createUser = async (name, operatorId, msisdn) => {
  try {
    const user = await User.getUser({ msisdn: msisdn });

    const operator = await Operator.getOperator({
      operatorId: operatorId,
    });

    let userDataRes = {};
    let token;

    // this condition executes when user doesn't exists
    if (!user) {
      const userData = await User.create({
        name: name,
        operator: operator.name,
        msisdn: msisdn,
      });

      const userDataResIfUserNotExist = {
        name: userData.name,
        userId: userData._id,
        msisdn: userData.msisdn,
        operator: userData.operator,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
        lastActive: null,
        userStatus: 1,
      };
      let tokenRes = this.getToken(userData.name, userData.msisdn);
      token = tokenRes;
      userDataRes = userDataResIfUserNotExist;
    }
    // this condition executes when user already exists
    else {
      const userDataResIfUserExist = {
        name: user.name,
        userId: user._id,
        msisdn: user.msisdn,
        operator: user.operator,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastActive: null,
        userStatus: 1,
      };

      let tokenRes = this.getToken(user.name, user.msisdn);
      token = tokenRes;
      userDataRes = userDataResIfUserExist;
    }
    return {
      message: "User Registred Successfully",
      token,
      status: 1,
      userData: userDataRes,
    };
  } catch (error) {
    throw error;
  }
};

// list of contacts using all mgram
exports.getUserUsingApp = async (userData, userId) => {
  try {
    const user = await User.getById({ _id: userId });
    const userDataRes = await Promise.all(
      userData.map(async (users) => {
        const userData = await User.getUser({
          msisdn: users,
        });

        const checkThread = await Thread.getThread({
          $or: [
            {
              $and: [
                { lastSenderId: userId },
                { recipientsIds: { $in: [userData._id] } },
              ],
            },
            {
              $and: [
                { lastSenderId: userData._id },
                { recipientsIds: { $in: [userId] } },
              ],
            },
          ],
        });

        // const checkThread = await Thread.getThread({
        //   $and: [
        //     {
        //       $or: [
        //         {
        //           $and: [
        //             { lastSenderId: userId },
        //             { recipientsIds: { $in: [userData?._id] } },
        //           ],
        //         },
        //         {
        //           $and: [
        //             { lastSenderId: userData?._id },
        //             { recipientsIds: { $in: [userId] } },
        //           ],
        //         },
        //       ],
        //     },
        //     { deletedForUser: { $nin: [userId] } },
        //   ],
        // });

        let threadIdRes;

        if (checkThread) {
          threadIdRes = checkThread._id;
        }

        let userDataObjectRes;

        if (userData !== null) {
          const userDataObject = {
            name: userData.name,
            msisdn: userData.msisdn,
            operator: userData.operator,
            userId: userData._id,
            threadId: threadIdRes,
          };
          userDataObjectRes = userDataObject;
        }

        return userDataObjectRes;
      })
    );

    let userDataResObj = userDataRes.find(
      (userDataItem) => userDataItem.msisdn === user.msisdn
    );

    if (userDataRes.includes(undefined)) {
      for (i = 0; i < userDataRes.length; i++) {
        const index = userDataRes.indexOf(undefined);
        if (index > -1) {
          userDataRes.splice(index, 1);
        }
      }
    }

    if (userDataRes.includes(userDataResObj)) {
      const indexRes = userDataRes.indexOf(userDataResObj);
      if (indexRes > -1) {
        userDataRes.splice(indexRes, 1);
      }
    }

    const data = userDataRes.filter(function (element) {
      return element !== undefined;
    });

    // const dataRes = data.find(
    //   (userDataItem) => userDataItem?.msisdn === user.msisdn
    // );

    return { userData: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    throw error;
  }
};
