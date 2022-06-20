exports.ThreadParticipants = `

type Thread {
    lastSenderId: Int,
    message: String,
    date: String,
    recipientsIds: String,
    currentUser: Int,
    unreadCount: Int,
    recipientsCount: Int,
    recipientUser: String,
    isGroup: Boolean,
    groupName: String,
}
`;
