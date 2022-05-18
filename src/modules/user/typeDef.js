const { User } = require("./contract");

const typeDef = `
${User}


type CreateUser {
    name: String!
}

type Query{
    isAuth: Boolean
}

type Mutation {
    createUser(name: String): CreateUser
}
`;

module.exports = typeDef;
