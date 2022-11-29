const UserController = require("./controller");

const resolvers = {
  Query: {
    getUserUsingApp: async (_parent, { userData, userId }, _context, _info) =>
      await UserController.getUserUsingApp(userData, userId),
    verifyOTP: async (_parent, { msisdn, otp }, _context, _info) =>
      await UserController.verifyOTP(msisdn, otp),
  },
  Mutation: {
    registerUser: async (
      _parent,
      { name, operatorId, msisdn, countryCode },
      _context,
      _info
    ) => await UserController.createUser(name, operatorId, msisdn, countryCode),
    blockUser: async (
      _parent,
      { userId, userIdToBlock },
      _context,
      _info
    ) => await UserController.blockUser(userId, userIdToBlock),
    unblockUser: async (
      _parent,
      { userId, userIdToUnblock },
      _context,
      _info
    ) => await UserController.unblockUser(userId, userIdToUnblock),
  },
};
module.exports = resolvers;
