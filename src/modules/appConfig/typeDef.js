const { AppConfig } = require("./contract");

const typeDef = `
scalar JSON
${AppConfig}

type AppConfigRes{
    id: ID
}

input AppConfigInput{
    configName: String,
    configValue: String
    apkLink: String
}

type AppConfigRes{
    appConfigRes: JSON
}

type Query{
    getAppConfig(operatorId: ID): AppConfigRes
}

type Mutation {
    createAppConfig(operatorId: ID,appConfig: [AppConfigInput]): AppConfigRes
}
`;

module.exports = typeDef;
