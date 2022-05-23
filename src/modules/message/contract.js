exports.Message = `

type Message {
    _id: ID
    threadId: Int,
    senderId: Int,
    message: String,
    dateSend: String,
    isAttachment: Boolean,
    attachment_id: Int,
    url: String,
}
`;
