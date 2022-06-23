const Attachment = require("./index");

exports.getById = async (id) => {
  try {
    const attachment = await Attachment.findById(id);
    return attachment;
  } catch (error) {
    throw error;
  }
};

exports.create = async (attachmentData) => {
  try {
    const attachment = await Attachment.create(attachmentData);
    return attachment;
  } catch (error) {
    throw error;
  }
};

exports.getApn = async (data) => {
  try {
    const attachment = await Attachment.findOne(data);
    return attachment;
  } catch (error) {
    throw error;
  }
};
