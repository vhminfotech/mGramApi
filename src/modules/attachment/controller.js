const Attachment = require("../../models/attachment/services");

exports.createAttachment = async (attachmentInput) => {
  try {
    const attachmentData = {
      messageId: attachmentInput.messageId,
      attachmentType: attachmentInput.attachmentType,
      url: attachmentInput.url,
    };
    const attachmentRes = await Attachment.create(attachmentData);
    return attachmentRes;
  } catch (error) {
    throw error;
  }
};

exports.getAttachment = async (id) => {
  try {
    const attachmentRes = await Attachment.getById({ _id: id });
    return attachmentRes;
  } catch (error) {
    throw error;
  }
};
