const { Attachment } = require("./contract");

const typeDef = `
scalar Upload
${Attachment}

input AttachmentInput{
    messageId: ID,
    attachmentType: String,
    url: String,
}

type File {
    filename: String
    mimetype: String
    encoding: String
    uri: String
    key: String
}

type Query{
    getAttachment(attachmentId: ID): Attachment
}

type Mutation {
    createAttachment(attachmentInput: AttachmentInput): Attachment
    uploadAttachments(files: Upload!): File
}
`;

module.exports = typeDef;
