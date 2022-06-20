const { User } = require("./contract");

const typeDef = `
scalar Date
scalar JSON
${User}

type UserData{
    name: String
    userId: ID
    msisdn: String
    operator: String
    createdAt: Date
    updatedAt: Date
    lastActive: String
    userStatus: Int
    chatFeature: Int
}


type CreateUser {
    userId: ID
    message: String
    token: String
    status: Int
    userData: UserData
    threadId: ID
}

type UserDataResponse{
    userData: [UserData]
}

type Query{
    getUserUsingApp(userData: [String],userId: ID,threadId: ID): UserDataResponse
    getAllUsers: User
}

type Mutation {
    registerUser(name: String, operatorId:ID, msisdn:String): CreateUser
}
`;

module.exports = typeDef;
