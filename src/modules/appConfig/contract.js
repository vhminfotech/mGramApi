exports.AppConfig = `

type ConfigsValue{
    configName: String,
    configValue: String
}

type AppConfig {
    _id: ID
    appConfigs: [ConfigsValue]
    operatorId: ID
}
`;
