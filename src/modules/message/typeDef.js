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
}

type GetMessageListRes{
    messages: [MessageData]
}

input MessageInput{
    threadId: ID,
    senderId: ID,
    message: String,
    dateSend: String,
    isAttachment: Boolean,
    attachmentType: AttachmentTypeEnum
    attachmentId: ID,
    url: String,
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
}

type Mutation {
    createMessage(messageInput : MessageInput): Message
    deleteMessages(deleteMessageInput : DeleteMessageInput): DeleteMessageRes
}
`;

module.exports = typeDef;
