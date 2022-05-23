const { APN } = require("./contract");

const typeDef = `
${APN}

input APNInput{
    operatorId: ID
    apnName: String,
    apn: String,
    proxy: String,
    port: String,
    userName: String,
    password: String,
    server: String,
    mmsc: String,
    mmsProxy: String,
    mmsPort: String,
    mcc: String,
    mnc: String,
    authType: String,
    apnType: String,
    apnProtocol: String,
    apnRoaming: String,
    bearer: String,
    mvnoType: String ,
    mvnoValue: String ,
}

type apnRes{
    id: ID
}

type Query{
    getApnDetails(operatorId: ID): APN
}

type Mutation {
    createAccessPointName(apnInput: APNInput): apnRes
}
`;

module.exports = typeDef;
