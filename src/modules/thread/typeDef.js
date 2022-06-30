const { Thread } = require("./contract");

const typeDef = `
${Thread}

type UserData{
    name: String
    msisdn: String
    operator: String
    userId: ID
    message: String
    messageDate: Date
    threadId: ID
    isGroup: Boolean
    groupName: String
    recipientIds: [String]
    isNotParticipant: [String]
    url: String
}

type ThreadListRes{
    recipientUser: [UserData],
}

input ThreadInput{
    lastSenderId: ID,
    message: String,
    date: String,
    recipientsIds: [ID],
    currentUser: Int,
    unreadCount: Int,
    recipientsCount: Int,
    recipientUser: String,
    isGroup: Boolean,
    groupName: String,
    url: String
}

input DeleteThreadInput{
    threadId: [ID]
    userId: ID
}

type ThreadRes{
    threadDelRes: String
}

type participantsOfGroupObj{
    mobile: String
    name: String
    isAdmin: Boolean
    id: ID
}

type GroupListRes{
    groupName: String
    groupCreatedDate: Date
    participantsOfGroup: [participantsOfGroupObj]
    isGroupAdmin: [String]
}

type Message{
    message: String
}

type Query{
    getThread(threadId: ID): Thread
    getThreadList(userId: ID): ThreadListRes
    getGroupDetails(groupId :ID): GroupListRes
}

type Mutation {
    createThread(threadInput: ThreadInput): Thread
    deleteThread(deleteThreadInput: DeleteThreadInput): ThreadRes
    createUserAAdminOfGroup(groupId: ID, userId: ID): Message
    exitGroup(groupId: ID, userId: ID): Message
    dismissionAdmin(groupId: ID, userId: ID, userToBeDismissID: ID): Message
    removeParticipantFromGroupIfUAreAdmin(groupId: ID, userId: ID, userToBeRemoveFromGroupID: ID): Message
}
`;

module.exports = typeDef;
