const ThreadController = require("./controller");

const resolvers = {
  Query: {
    getThread: async (_parent, { threadId }, _context, _info) =>
      await ThreadController.getThread(threadId),
    getThreadList: async (_parent, { userId }, { user }, _info) =>
      await ThreadController.getThreadList(userId, user),
    getGroupDetails: async (_parent, { groupId }, { }, _info) =>
      await ThreadController.getGroupDetails(groupId),
  },
  Mutation: {
    createThread: async (_parent, { threadInput }, _context, _info) =>
      await ThreadController.createThread(threadInput),
    deleteThread: async (_parent, { deleteThreadInput }, _context, _info) =>
      await ThreadController.deleteThread(deleteThreadInput),
    createUserAAdminOfGroup: async (_parent, { groupId, userId }, _context, _info) =>
      await ThreadController.createUserAAdminOfGroup(groupId, userId),
    exitGroup: async (_parent, { groupId, userId }, _context, _info) =>
      await ThreadController.exitGroup(groupId, userId),
    dismissionAdmin: async (_parent, { groupId, userId, userToBeDismissID }, _context, _info) =>
      await ThreadController.dismissionAdmin(groupId, userId, userToBeDismissID),
    removeParticipantFromGroupIfUAreAdmin: async (_parent, { groupId, userId, userToBeRemoveFromGroupID }, _context, _info) =>
      await ThreadController.removeParticipantFromGroupIfUAreAdmin(groupId, userId, userToBeRemoveFromGroupID),
    muteChat: async (_parent, { userId, threadId }, _context, _info) =>
      await ThreadController.muteChat(userId, threadId),
    unmuteChat: async (_parent, { userId, threadId }, _context, _info) =>
      await ThreadController.unmuteChat(userId, threadId),
  },
};
module.exports = resolvers;
