const AccessPointName = require("./index");

exports.getById = async (id) => {
  try {
    const accessPointName = await AccessPointName.findById(id);
    return accessPointName;
  } catch (error) {
    throw error;
  }
};

exports.create = async (accessPointNameData) => {
  try {
    const accessPointName = await AccessPointName.create(accessPointNameData);
    return accessPointName;
  } catch (error) {
    throw error;
  }
};

exports.getApn = async (data) => {
  try {
    const accessPointName = await AccessPointName.findOne(data);
    return accessPointName;
  } catch (error) {
    throw error;
  }
};
