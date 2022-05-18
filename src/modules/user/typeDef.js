const { User } = require("./contract");

const typeDef = `
scalar Date
${User}

type UserData{
    name: String
    userId: ID
    MSISDN: String
    operator: String
    createdAt: Date
    updatedAt: Date
    lastActive: String
    userStatus: Int
    chatFeature: Int
}

type CreateUser {
    userId: ID
    messege: String
    token: String
    status: Int
    userData: UserData
}

type Mutation {
    registerUser(name: String, operatorId:ID, MSISDN:String): CreateUser
}
`;

module.exports = typeDef;
