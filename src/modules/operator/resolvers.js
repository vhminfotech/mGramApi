const OperatorController = require("./controller");

const resolvers = {
  Mutation: {
    createOperator: async (_parent, { name, operatorId }, _context, _info) =>
      await OperatorController.createOperator(name, operatorId),
  },
};
module.exports = resolvers;
