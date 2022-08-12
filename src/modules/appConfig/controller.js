const AppConfig = require("../../models/appConfig/services");
const Operator = require("../../models/operator/services");

exports.createAppConfig = async (operatorId, appConfig) => {
  try {
    const appConfigData = {
      operatorId: operatorId,
      appConfigs: appConfig,
    };

    const appConfigRes = await AppConfig.createAppConfig(appConfigData);

    return { id: appConfigRes._id };
  } catch (error) {
    throw error;
  }
};

exports.getAppConfig = async (operatorId) => {
  try {
    // const getAccessRes = await Operator.getOperator({
    //   operatorId: operatorId,
    // });

    const appConfigResData = await AppConfig.getAppConfig({
      operatorId: operatorId,
    });

    return { appConfigRes: appConfigResData.appConfigs };
  } catch (error) {
    throw error;
  }
};
