require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlUploadExpress } = require("graphql-upload");
const { resolvers, typeDefs, permissions } = require("./modules");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json());

const schema = makeExecutableSchema({ typeDefs, resolvers });

// GraphQL
app.use(
  "/api",
  graphqlUploadExpress({ maxFileSize: 20000000, maxFiles: 2 }),
  graphqlHTTP((request, response, graphQLParams) => ({
    schema: applyMiddleware(schema, permissions),
    // validationRules: [NoIntrospection],
    graphiql: true,
    context: {
      user: request.user || null,
    },
  }))
);

exports.app = app;
