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

type BlockRes{
    error: String
}

type VerifyOTPRes{
    error: Boolean
    message: String
}

type Query{
    getUserUsingApp(userData: [String],userId: ID,threadId: ID): UserDataResponse
    getAllUsers: User
    verifyOTP(msisdn:String,otp: String): VerifyOTPRes
}

type Mutation {
    registerUser(name: String, operatorId:ID, msisdn:String, countryCode:String): CreateUser
    blockUser(userId: ID, userIdToBlock: ID): BlockRes
    unblockUser(userId: ID, userIdToUnblock: ID): BlockRes
}
`;

module.exports = typeDef;
