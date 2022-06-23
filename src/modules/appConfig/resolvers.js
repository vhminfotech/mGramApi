const AppConfigController = require("./controller");

const resolvers = {
  Query: {
    getAppConfig: async (_parent, { operatorId }, _context, _info) =>
      await AppConfigController.getAppConfig(operatorId),
  },
  Mutation: {
    createAppConfig: async (
      _parent,
      { operatorId, appConfig },
      _context,
      _info
    ) => await AppConfigController.createAppConfig(operatorId, appConfig),
  },
};
module.exports = resolvers;
