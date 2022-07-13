exports.Message = `

type Message {
    _id: ID
    threadId: ID,
    senderId: ID,
    message: String,
    dateSend: String,
    isAttachment: Boolean,
    attachmentId: ID,
    url: String,
    isDeleted: Boolean
    deletedForUser: [String]
    isForwarded: Boolean,
}
`;
