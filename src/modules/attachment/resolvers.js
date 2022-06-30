const AttachmentController = require("./controller");

const resolvers = {
  Query: {
    getAttachment: async (_parent, { attachmentId }, _context, _info) =>
      await AttachmentController.getAttachment(attachmentId),
  },
  Mutation: {
    createAttachment: async (_parent, { attachmentInput }, _context, _info) =>
      await AttachmentController.createAttachment(attachmentInput),
    uploadAttachments: async (_parent, { files }, _context, _info) =>
      await AttachmentController.uploadAttachments(files),
  },
};
module.exports = resolvers;
