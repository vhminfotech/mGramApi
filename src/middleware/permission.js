const { rule, allow } = require("graphql-shield");

exports.isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

exports.allow = allow;
