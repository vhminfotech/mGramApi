const { Message } = require("./contract");

const typeDef = `
${Message}

enum AttachmentTypeEnum{
    text
    image
    video
}

type MessageData{
    id: ID,
    threadId: ID,
    senderId: ID,
    message: String,
    dateSent: Date,
    userName: String
    url: String
    read: String
}

type GetMessageListRes{
    messages: [MessageData],
    blocked: Boolean
}

input MessageInput{
    threadId: ID,
    senderId: ID,
    receiverId: ID,
    message: String,
    dateSend: String,
    isAttachment: Boolean,
    attachmentType: AttachmentTypeEnum
    attachmentId: ID,
    url: String,
    isForwarded: Boolean,
}

type DeleteMessageRes{
    messageId: ID
    messageRes: String
}

input DeleteMessageInput{
    threadId: ID,
    userId: ID,
    messageId: [ID],
    attachmentId: ID
}


type Query{
    getMessage(messageId: ID): Message
    getMessageList(senderId: ID, receiverId: ID, threadId: ID): GetMessageListRes
    getGroupMessageList(senderId: ID, threadId: ID): GetMessageListRes
}

type Mutation {
    createMessage(messageInput : MessageInput): Message
    deleteMessages(deleteMessageInput : DeleteMessageInput): DeleteMessageRes
    forwardMessage(messageInput: MessageInput): Message
}
`;

module.exports = typeDef;
