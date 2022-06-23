const AccessPointName = require("../../models/accessPointName/services");

exports.createAccessPointName = async (apnInput) => {
  try {
    const accessPointNameData = {
      operatorId: apnInput.operatorId,
      apnName: apnInput.apnName,
      apn: apnInput.apn,
      proxy: apnInput.proxy,
      port: apnInput.port,
      userName: apnInput.userName,
      password: apnInput.password,
      server: apnInput.server,
      mmsc: apnInput.mmsc,
      mmsProxy: apnInput.mmsProxy,
      mmsPort: apnInput.mmsPort,
      mcc: apnInput.mcc,
      mnc: apnInput.mnc,
      authType: apnInput.authType,
      apnType: apnInput.apnType,
      apnProtocol: apnInput.apnProtocol,
      apnRoaming: apnInput.apnRoaming,
      bearer: apnInput.bearer,
      mvnoType: apnInput.mvnoType,
      mvnoValue: apnInput.mvnoValue,
    };
    const accessPointNameRes = await AccessPointName.create(
      accessPointNameData
    );

    return { id: accessPointNameRes._id };
  } catch (error) {
    throw error;
  }
};

exports.getApnDetails = async (operatorId) => {
  try {
    const getAccessRes = await AccessPointName.getApn({
      operatorId: operatorId,
    });

    const getAccessResData = {
      operatorId: getAccessRes.operatorId,
      apnName: getAccessRes.apnName,
      apn: getAccessRes.apn,
      proxy: getAccessRes.proxy,
      port: getAccessRes.port,
      userName: getAccessRes.userName,
      password: getAccessRes.password,
      server: getAccessRes.server,
      mmsc: getAccessRes.mmsc,
      mmsProxy: getAccessRes.mmsProxy,
      mmsPort: getAccessRes.mmsPort,
      mcc: getAccessRes.mcc,
      mnc: getAccessRes.mnc,
      authType: getAccessRes.authType,
      apnType: getAccessRes.apnType,
      apnProtocol: getAccessRes.apnProtocol,
      apnRoaming: getAccessRes.apnRoaming,
      bearer: getAccessRes.bearer,
      mvnoType: getAccessRes.mvnoType,
      mvnoValue: getAccessRes.mvnoValue,
      _id: getAccessRes._id,
    };
    return getAccessResData;
  } catch (error) {
    throw error;
  }
};
