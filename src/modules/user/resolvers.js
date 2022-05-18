const UserController = require("./controller");

const resolvers = {
  Mutation: {
    createUser: async (_parent, { name }, _context, _info) =>
      await UserController.createUser(name),
  },
};
module.exports = resolvers;
