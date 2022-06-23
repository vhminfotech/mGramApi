const Thread = require("../../models/thread/services");
const User = require("../../models/user/services");
const Message = require("../../models/message/services");
const moment = require("moment");
const { getMessageList } = require("../message/controller");

exports.createThread = async (threadInput) => {
  try {
    let checkThread;
    if (threadInput.isGroup === false) {
      let recipientsId = threadInput?.recipientsIds[0];
      const checkThreadRes = await Thread.getThread({
        $or: [
          {
            $and: [
              { lastSenderId: threadInput?.lastSenderId },
              { recipientsIds: { $in: [recipientsId] } },
            ],
          },
          {
            $and: [
              { lastSenderId: recipientsId },
              { recipientsIds: { $in: [threadInput?.lastSenderId] } },
            ],
          },
        ],
      });
      checkThread = checkThreadRes;
    }

    if (checkThread) {
      return checkThread;
    } else {
      const threadData = {
        message: threadInput?.message,
        lastSenderId: threadInput?.lastSenderId,
        recipientsIds: threadInput?.recipientsIds,
        date: moment.utc(new Date()).format(),
        isGroup: threadInput?.isGroup,
        groupName: threadInput.groupName,
      };

      const threadRes = await Thread.create(threadData);

      const messageData = {
        dateSend: moment.utc(new Date()).format(),
        message: threadInput?.message,
        threadId: threadRes._id,
        senderId: threadInput?.lastSenderId,
      };
      const message = await Message.create(messageData);

      return threadRes;
    }
  } catch (error) {
    throw error;
  }
};

exports.getThread = async (threadId) => {
  try {
    const threadRes = await Thread.getById(threadId);
    return threadRes;
  } catch (error) {
    throw error;
  }
};

exports.getThreadList = async (userId) => {
  try {
    const threadRes = await Thread.getAll({
      $and: [
        {
          $or: [{ lastSenderId: userId }, { recipientsIds: { $in: [userId] } }],
        },
        { deletedForUser: { $nin: [userId] } },
      ],
    });

    // const threadRes = await Thread.getAll({
    //   $or: [{ lastSenderId: userId }, { recipientsIds: { $in: [userId] } }],
    // });

    const recipientsIdsArr = [];
    threadRes.forEach((threadListItems) => {
      recipientsIdsArr.push({
        recipientsIds: String(threadListItems.recipientsIds[0]),
        message: threadListItems?.message,
        messageDate: threadListItems.createdAt,
        threadId: threadListItems._id,
        lastSenderId: threadListItems.lastSenderId,
        isGroup: threadListItems.isGroup,
      });
    });

    let uniqueChars = [
      ...new Map(
        recipientsIdsArr.map((item) => [item["recipientsIds"], item])
      ).values(),
    ];

    const threadList = await Promise.all(
      uniqueChars.map(async (arritem) => {
        let user;
        if (arritem.recipientsIds === userId) {
          const userRes = await User.getById({ _id: arritem.lastSenderId });
          user = userRes;
        } else {
          const userRes = await User.getById({ _id: arritem.recipientsIds });
          user = userRes;
        }

        const messageRes = await Message.getAll({
          $and: [
            { threadId: arritem.threadId },
            { deletedForUser: { $nin: [userId] } },
          ],
        });

        const recipientUser = {
          name: user.name,
          msisdn: user.msisdn,
          operator: user.operator,
          userId: user._id,
          message: messageRes[0]?.message,
          messageDate: messageRes[0]?.createdAt,
          threadId: arritem.threadId,
          isGroup: arritem.isGroup,
        };

        return recipientUser;
      })
    );

    const threadListRes = threadList.filter(
      (threadListItem) => threadListItem.message !== undefined
    );

    return { recipientUser: JSON.parse(JSON.stringify(threadListRes)) };
  } catch (error) {
    throw error;
  }
};

//thread Delete
exports.deleteThread = async (deleteThreadInput) => {
  try {
    const updateObject = deleteThreadInput.userId;
    const deleteThreadRes = deleteThreadInput.threadId.map(
      async (deleteThreadInputItem) => {
        const updateThreadRes = await Thread.update(
          deleteThreadInputItem,
          updateObject
        );

        const messageRes = await Message.updateAllMessage(
          deleteThreadInputItem,
          updateObject
        );

        return updateThreadRes;
      }
    );

    let deleteThreadResult;
    if (deleteThreadRes) {
      deleteThreadResult = "Thread Deleted";
    } else {
      deleteThreadResult = "Thread Is Not Deleted";
    }
    return { threadDelRes: deleteThreadResult };
  } catch (error) {
    throw error;
  }
};
