const { Attachment } = require("./contract");

const typeDef = `
${Attachment}

input AttachmentInput{
    messageId: ID,
    attachmentType: String,
    url: String,
}

type Query{
    getAttachment(attachmentId: ID): Attachment
}

type Mutation {
    createAttachment(attachmentInput: AttachmentInput): Attachment
}
`;

module.exports = typeDef;
