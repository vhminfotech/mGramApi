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
}

input DeleteThreadInput{
    threadId: [ID]
    userId: ID
}

type ThreadRes{
    threadDelRes: String
}

type Query{
    getThread(threadId: ID): Thread
    getThreadList(userId: ID): ThreadListRes
}

type Mutation {
    createThread(threadInput: ThreadInput): Thread
    deleteThread(deleteThreadInput: DeleteThreadInput): ThreadRes
}
`;

module.exports = typeDef;
