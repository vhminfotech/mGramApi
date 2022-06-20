const UserController = require("./controller");

const resolvers = {
  Query: {
    getUserUsingApp: async (_parent, { userData, userId }, _context, _info) =>
      await UserController.getUserUsingApp(userData, userId),
  },
  Mutation: {
    registerUser: async (
      _parent,
      { name, operatorId, msisdn },
      _context,
      _info
    ) => await UserController.createUser(name, operatorId, msisdn),
  },
};
module.exports = resolvers;
