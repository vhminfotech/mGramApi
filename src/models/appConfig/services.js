const AppConfig = require("./index");

exports.createAppConfig = async (accessPointNameData) => {
  try {
    const appConfig = await AppConfig.create(accessPointNameData);
    return appConfig;
  } catch (error) {
    throw error;
  }
};

exports.getAppConfig = async (data) => {
  try {
    const appConfig = await AppConfig.findOne(data);
    return appConfig;
  } catch (error) {
    throw error;
  }
};
