exports.Thread = `

type Thread {
    id: ID
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
    deletedForUser: [String]
    isGroupAdmin: [String]
    isNotParticipants: [String]
}
`;
