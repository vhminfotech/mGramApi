const assign = require("assign-deep");
const { shield } = require("graphql-shield");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { buildSchema, print, GraphQLError } = require("graphql");
const User = require("./user");
const Operator = require("./operator");
const AccessPointName = require("./accessPointName");
const AppConfig = require("./appConfig");
const Thread = require("./thread");
const Attachment = require("./attachment");
const Message = require("./message");

const typeDefs = [
  User.typeDef,
  Operator.typeDef,
  AccessPointName.typeDef,
  AppConfig.typeDef,
  Thread.typeDef,
  Attachment.typeDef,
  Message.typeDef,
];

const resolvers = [
  User.resolvers,
  Operator.resolvers,
  AccessPointName.resolvers,
  AppConfig.resolvers,
  Thread.resolvers,
  Attachment.resolvers,
  Message.resolvers,
];

const permissions = [User.permissions, Thread.permissions];

const mergedTypeDef = print(mergeTypeDefs(typeDefs));
exports.typeDefs = buildSchema(mergedTypeDef);

const permissionObject = shield(assign(...permissions), {
  fallbackError: async (thrownThing, parent, args, context, info) => {
    if (thrownThing === null) return new GraphQLError("Not Authorized");
    return thrownThing;
  },
});

exports.resolvers = resolvers;
exports.permissions = permissionObject;
