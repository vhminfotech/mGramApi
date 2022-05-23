const AccessPointNameController = require("./controller");

const resolvers = {
  Query: {
    getApnDetails: async (_parent, { operatorId }, _context, _info) =>
      await AccessPointNameController.getApnDetails(operatorId),
  },
  Mutation: {
    createAccessPointName: async (_parent, { apnInput }, _context, _info) =>
      await AccessPointNameController.createAccessPointName(apnInput),
  },
};
module.exports = resolvers;
