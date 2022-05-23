const UserController = require("./controller");

const resolvers = {
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
