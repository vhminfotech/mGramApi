const UserController = require("./controller");

const resolvers = {
  Mutation: {
    registerUser: async (
      _parent,
      { name, operatorId, MSISDN },
      _context,
      _info
    ) => await UserController.createUser(name, operatorId, MSISDN),
  },
};
module.exports = resolvers;
