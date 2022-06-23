const ThreadController = require("./controller");

const resolvers = {
  Query: {
    getThread: async (_parent, { threadId }, _context, _info) =>
      await ThreadController.getThread(threadId),
    getThreadList: async (_parent, { userId }, { user }, _info) =>
      await ThreadController.getThreadList(userId, user),
  },
  Mutation: {
    createThread: async (_parent, { threadInput }, _context, _info) =>
      await ThreadController.createThread(threadInput),
    deleteThread: async (_parent, { deleteThreadInput }, _context, _info) =>
      await ThreadController.deleteThread(deleteThreadInput),
  },
};
module.exports = resolvers;
