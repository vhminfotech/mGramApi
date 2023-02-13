const Message = require("../../models/message/services");
const Thread = require("../../models/thread/services");
const User = require("../../models/user/services");
const moment = require("moment-timezone");

exports.createMessage = async (messageInput) => {
  try {

    let blockedMessage
    const threadRes = await Thread.getById(messageInput.threadId)

    if (threadRes?.deletedForUser.includes(messageInput?.receiverId)) {
      await Thread.updateOne(messageInput?.threadId, messageInput?.receiverId)
    }
    let userRes

    if (messageInput?.receiverId) {
      const userResult = await User.getById(messageInput?.receiverId)
      userRes = userResult
    }

    let userIsInArray
    if (userRes) {
      let userIsInArrayRes = userRes.blockdUser.some(function (blockedUserItem) {
        return blockedUserItem === messageInput.senderId;
      });
      userIsInArray = userIsInArrayRes
    }


    if (userIsInArray === true) {
      blockedMessage = true
    } else {
      blockedMessage = false
    }



    const messageData = {
      dateSend: moment().format("YYYY-MM-DD[T]HH:mm:ss.SSS"),
      message: messageInput.message,
      threadId: messageInput.threadId,
      senderId: messageInput.senderId,
      url: messageInput?.url,
      blockedMessage: blockedMessage
    };
    if (messageInput.isAttachment) {
      messageData.attachmentType = messageInput.attachmentType;
    }

    const messageRes = await Message.create(messageData);

    // messageRes.dateSend = moment(messageRes.createdAt).toLocaleString("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
    // messageRes.dateSend = moment.utc(messageRes.createdAt).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
    // messageRes.dateSend = new Date(messageRes.createdAt).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    messageRes.dateSend = moment(messageRes.createdAt).tz('Asia/Kolkata').format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")


    return messageRes;
  } catch (error) {
    throw error;
  }
};

exports.getMessageList = async (senderId, receiverId, threadId, userId) => {
  try {

    const checkThread = await Thread.getThread({
      $and: [{
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
        ]
      }, { isGroup: false }]
    });

    let threadIdObjRes;

    if (checkThread) {
      const threadIdObj = { threadId: checkThread._id };
      threadIdObjRes = threadIdObj;
    } else {
      const threadIdObj = { threadId: threadId };
      threadIdObjRes = threadIdObj;
    }

    let messageRes
    if (threadIdObjRes) {
      const messageResult = await Message.getAllMessage({
        $and: [threadIdObjRes, { deletedForUser: { $nin: [senderId] } }, { blockedMessage: false }],
      });
      messageRes = messageResult
    }

    const messageListRes = messageRes.map(async (messageItem) => {

      let read = false
      if (userId !== messageItem.senderId) {
        const updateThreadObj = {
          read: true
        }
        const updateThreadRes = await Message.getByIdAndUpdate(messageItem._id, updateThreadObj)
        read = true
      }
      const messageObj = {
        id: messageItem._id,
        threadId: messageItem.threadId,
        senderId: messageItem.senderId,
        message: messageItem.message,
        // dateSent: messageItem.createdAt,
        url: messageItem.url,
        read: read
      };
      messageObj.dateSent = moment.utc(messageItem.createdAt).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
      return messageObj;
    });

    const userRes = await User.getById(senderId)

    var userIsInArray = userRes.blockdUser.some(function (blockedUserItem) {
      return blockedUserItem === receiverId;
    });



    return { messages: messageListRes, blocked: userIsInArray };
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

    const messageListRes = await Promise.all(messageRes.map(async (messageItem) => {
      const userRes = await User.getById({ _id: messageItem.senderId });
      const messageObj = {
        id: messageItem._id,
        threadId: messageItem.threadId,
        senderId: messageItem.senderId,
        message: messageItem.message,
        // dateSent: messageItem.createdAt,
        userName: userRes.name,
      };
      messageObj.dateSent = moment.utc(messageItem.createdAt).format("YYYY-MM-DD[T]HH:mm:ss.SSSZ")
      return messageObj;
    }));


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

exports.forwardMessage = async (messageInput) => {
  try {

    const threadRes = await Thread.getById(messageInput.threadId)

    if (threadRes?.deletedForUser.includes(messageInput?.receiverId)) {
      await Thread.updateOne(messageInput?.threadId, messageInput?.receiverId)
    }

    const messageRes = await Promise.all(messageInput.chat.map(async (chatItem) => {
      const messageData = {
        dateSend: moment.utc(new Date()).format(),
        message: chatItem.message,
        threadId: messageInput.threadId,
        senderId: messageInput.senderId,
        url: chatItem?.url,
        isForwarded: true,
        isAttachment: chatItem?.isAttachment,
        attachmentType: chatItem?.attachmentType,
        attachmentId: chatItem?.attachmentId

      };

      const messageRes = await Message.create(messageData);
      return messageRes
    }))


    return { messages: messageRes };
  } catch (error) {
    throw error
  }
}