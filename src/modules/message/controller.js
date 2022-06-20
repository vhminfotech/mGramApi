const Message = require("../../models/message/services");
const Thread = require("../../models/thread/services");
const moment = require("moment");

exports.createMessage = async (messageInput) => {
  try {
    const messageData = {
      dateSend: moment.utc(new Date()).format(),
      message: messageInput.message,
      threadId: messageInput.threadId,
      senderId: messageInput.senderId,
    };
    if (messageInput.isAttachment) {
      messageData.attachmentType = messageInput.attachmentType;
    }

    const messageRes = await Message.create(messageData);

    console.log("messageRes createMessage", messageRes);
    return messageRes;
  } catch (error) {
    throw error;
  }
};

exports.getMessageList = async (senderId, receiverId, threadId) => {
  try {
    const checkThread = await Thread.getThread({
      $or: [
        {
          $and: [
            { lastSenderId: senderId },
            { recipientsIds: { $in: [receiverId] } },
          ],
        },
        {
          $and: [
            { lastSenderId: receiverId },
            { recipientsIds: { $in: [senderId] } },
          ],
        },
      ],
    });

    console.log("checkThread getMessageList", checkThread);

    let threadIdObjRes;

    if (checkThread) {
      const threadIdObj = { threadId: checkThread._id };
      threadIdObjRes = threadIdObj;
    } else {
      const threadIdObj = { threadId: threadId };
      threadIdObjRes = threadIdObj;
    }

    const messageRes = await Message.getAllMessage({
      $and: [threadIdObjRes, { deletedForUser: { $nin: [senderId] } }],
    });

    // const messageRes = await Message.getAllMessage(threadIdObjRes);

    console.log("messageRes getMessageList", messageRes);

    const messageListRes = messageRes.map((messageItem) => {
      const messageObj = {
        id: messageItem._id,
        threadId: messageItem.threadId,
        senderId: messageItem.senderId,
        message: messageItem.message,
        dateSent: messageItem.createdAt,
      };
      return messageObj;
    });

    console.log("messageListRes getMessageList", messageListRes);

    return { messages: messageListRes };
  } catch (error) {
    throw error;
  }
};

exports.deleteMessages = async (deleteMessageInput) => {
  try {
    console.log(
      "deleteMessageInput.userId deleteMessages",
      deleteMessageInput.userId
    );
    const updateObject = deleteMessageInput.userId;
    const deleteMessageRes = deleteMessageInput.messageId.map(
      async (deleteMessageInputItem) => {
        const updateMessageRes = await Message.update(
          deleteMessageInputItem,
          updateObject
        );

        return updateMessageRes;
      }
    );

    let deleteMessageResult;
    if (deleteMessageRes) {
      deleteMessageResult = "Message Deleted";
    } else {
      deleteMessageResult = "Message Is Not Deleted";
    }
    return { messageRes: deleteMessageResult };
  } catch (error) {
    throw error;
  }
};
