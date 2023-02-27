require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlUploadExpress } = require("graphql-upload");
const { resolvers, typeDefs, permissions } = require("./modules");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json());
app.use(express.static('public'))

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(express.static(path.join(__dirname, "public")));

// GraphQL
app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 200000000000000000000000, maxFiles: 2 }),
  graphqlHTTP((request, response, graphQLParams) => ({
    schema: applyMiddleware(schema, permissions),
    graphiql: true,
    context: {
      user: request.user || null,
    },
  }))
);

exports.app = app;
