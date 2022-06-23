const MessageController = require("./controller");

const resolvers = {
  Query: {
    getMessageList: async (
      _parent,
      { senderId, receiverId, threadId },
      _context,
      _info
    ) => await MessageController.getMessageList(senderId, receiverId, threadId),
    getGroupMessageList: async (
      _parent,
      { senderId, threadId },
      _context,
      _info
    ) =>
      await MessageController.getGroupMessageList(
        senderId,

        threadId
      ),
  },
  Mutation: {
    createMessage: async (_parent, { messageInput }, _context, _info) =>
      await MessageController.createMessage(messageInput),
    deleteMessages: async (_parent, { deleteMessageInput }, _context, _info) =>
      await MessageController.deleteMessages(deleteMessageInput),
  },
};
module.exports = resolvers;
