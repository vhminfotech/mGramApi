const Message = require("../../models/message/services");
const Thread = require("../../models/thread/services");
const User = require("../../models/user/services");
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

    return { messages: messageListRes };
  } catch (error) {
    throw error;
  }
};

exports.getGroupMessageList = async (senderId, threadId) => {
  try {
    const threadIdObj = { threadId: threadId };

    const messageRes = await Message.getAllMessage({
      $and: [threadIdObj, { deletedForUser: { $nin: [senderId] } }],
    });

    const messageListRes = messageRes.map(async (messageItem) => {
      const userRes = await User.getById({ _id: messageItem.senderId });
      const messageObj = {
        id: messageItem._id,
        threadId: messageItem.threadId,
        senderId: messageItem.senderId,
        message: messageItem.message,
        dateSent: messageItem.createdAt,
        userName: userRes.name,
      };
      return messageObj;
    });

    return { messages: messageListRes };
  } catch (error) {
    throw error;
  }
};

exports.deleteMessages = async (deleteMessageInput) => {
  try {
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
