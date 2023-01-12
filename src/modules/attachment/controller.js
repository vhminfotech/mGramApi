const Attachment = require("../../models/attachment/services");
const path = require("path")
const fs = require("fs")

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

exports.uploadAttachments = async (files) => {
  try {
    
    const { createReadStream, filename, mimetype, encoding } = await files.file;
    const stream = createReadStream()
    // const pathName = path.join(__dirname, `../../../public/uploads/${filename}`)
    // for server
    const pathName = path.join("/usr/share/nginx/html", `/public1/${filename}`)


    await stream.pipe(fs.createWriteStream(pathName))

    return {
      // uri: `${process.env.SERVER_URL}/uploads/${filename}`,
      // for server
      uri: `${process.env.SERVER_URL}/public1/${filename}`,

    };
  } catch (error) {
    throw error
  }
}
