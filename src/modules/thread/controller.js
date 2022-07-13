const Thread = require("../../models/thread/services");
const User = require("../../models/user/services");
const Message = require("../../models/message/services");
const moment = require("moment");

const _ = require('lodash');
const { getMessageList } = require("../message/controller");

exports.createThread = async (threadInput) => {
  try {
    console.log("threadInput", threadInput)
    let checkThread;
    if (threadInput.isGroup === false) {
      let recipientsId = threadInput?.recipientsIds[0];
      const checkThreadRes = await Thread.getThread({
        $and: [{
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
          ]
        }, { isGroup: false }]
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

      const threadUpdateRes = await Thread.updateIsAdmin(threadRes._id, threadRes.lastSenderId)

      const messageData = {
        dateSend: moment.utc(new Date()).format(),
        message: threadInput?.message,
        threadId: threadRes._id,
        senderId: threadInput?.lastSenderId,
        url: threadInput?.url
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

    // const threadRes = await Thread.getAll({
    //   $and: [
    //     {
    //       $or: [{ lastSenderId: userId }, { recipientsIds: { $in: [userId] } }],
    //     },
    //     { deletedForUser: { $nin: [userId] } },
    //   ],
    // });


    const threadRes = await Thread.getAll({
      $or: [{ lastSenderId: userId }, { recipientsIds: { $in: [userId] } }],
    });

    const threadsExcept = []

    await Promise.all(threadRes.map(async (threadResItem) => {
      if (threadResItem.isGroup === false) {

        const threadDeleted = await Thread.getThread({
          $and: [
            {
              _id: threadResItem._id
            },
            { deletedForUser: { $nin: [userId] } },
          ],
        })
        if (threadDeleted) { threadsExcept.push(threadResItem) }

      } else {
        threadsExcept.push(threadResItem)
      }
    }))

    const recipientsIdsArr = []
    threadsExcept.forEach((threadListItems) => {
      const arr = []
      threadListItems.recipientsIds.forEach((id, index) => {
        arr.push(id)

      })
      arr.push(threadListItems.lastSenderId)

      _.remove(arr, function (el) {

        // remove all numbers
        return el == userId;

      });

      recipientsIdsArr.push({
        recipientsIds: String(threadListItems.recipientsIds[0]),
        message: threadListItems?.message,
        messageDate: threadListItems.createdAt,
        threadId: threadListItems._id,
        lastSenderId: threadListItems.lastSenderId,
        isGroup: threadListItems.isGroup,
        groupName: threadListItems?.groupName,
        recipientIds: arr,
        isNotParticipants: threadListItems?.isNotParticipants
      });
    });

    let uniqueChars = [
      ...new Map(
        recipientsIdsArr.map((item) => [item["recipientsIds"], item])
      ),
    ];

    const threadList = await Promise.all(
      recipientsIdsArr.map(async (arritem) => {
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
          message: messageRes[0].message,
          messageDate: messageRes[0].createdAt,
          threadId: arritem.threadId,
          isGroup: arritem.isGroup,
          groupName: arritem.groupName,
          recipientIds: arritem.recipientIds,
          isNotParticipant: arritem.isNotParticipants,
          url: messageRes[0]?.url
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

exports.getGroupDetails = async (groupId) => {
  try {

    const threadRes = await Thread.getById(groupId)
    const deletedUser = threadRes?.deletedForUser

    const participantsOfGroup = []

    const groupFirstSender = await User.getById(threadRes?.lastSenderId)



    const senderOfGroupObj = {
      name: groupFirstSender?.name,
      mobile: groupFirstSender?.msisdn,
      id: groupFirstSender?._id
    }

    if (threadRes.isGroupAdmin.includes(groupFirstSender._id)) {
      senderOfGroupObj.isAdmin = true
    } else {
      senderOfGroupObj.isAdmin = false
    }

    if (!deletedUser.includes(groupFirstSender._id)) {
      participantsOfGroup.push(senderOfGroupObj)
    }

    await Promise.all(threadRes.recipientsIds.map(async (recipientsIds) => {
      const allGroupParticipants = await User.getById(recipientsIds)

      const participantsOfGroupObj = {
        name: allGroupParticipants?.name,
        mobile: allGroupParticipants?.msisdn,
        id: allGroupParticipants?._id
      }


      if (threadRes.isGroupAdmin.includes(allGroupParticipants._id)) {
        participantsOfGroupObj.isAdmin = true
      } else {
        participantsOfGroupObj.isAdmin = false
      }

      if (!deletedUser.includes(allGroupParticipants._id)) {
        participantsOfGroup.push(participantsOfGroupObj)
      }
    }))
    const groupDetailsObj = {
      groupName: threadRes.groupName,
      groupCreatedDate: threadRes.createdAt,
      participantsOfGroup: participantsOfGroup,
      isGroupAdmin: threadRes?.isGroupAdmin
    }

    return JSON.parse(JSON.stringify(groupDetailsObj))
  } catch (error) {
    throw error
  }
}


exports.createUserAAdminOfGroup = async (groupId, userId) => {
  try {

    const threadUpdateRes = await Thread.updateIsAdmin(groupId, userId)
    if (threadUpdateRes) {
      return { message: "Admin Updated Successfully" }
    } else {
      return { message: "Admin Updation Failed" }
    }

  } catch (error) {
    throw error
  }
}

exports.exitGroup = async (groupId, userId) => {
  try {
    const threadUpdateRes = await Thread.update(groupId, userId)
    const threadUpdateIsParticipant = await Thread.updateIsParticipant(groupId, userId)
    if (threadUpdateIsParticipant) {
      return { message: "You are no longer participant of the group" }
    } else {
      return { message: "Group Exit Updation Failed" }
    }
  } catch (error) {
    throw error
  }
}

//TODO apply check if user removing user admin
exports.dismissionAdmin = async (groupId, userId, userToBeDismissID) => {
  try {

    const threadUpdate = await Thread.getThread({ $and: [{ _id: groupId }, { isGroupAdmin: { $in: [userId] } }] })

    if (!threadUpdate) {
      return { message: "You Do Not Have Permission" }
    }

    const threadUpdateRes = await Thread.updateAdminByDeleteAdmin(groupId, userToBeDismissID)

    if (threadUpdateRes) {
      return { message: "User Removed As Admin" }
    } else {
      return { message: "User Removed As Admin Failed" }
    }
  } catch (error) {
    throw error
  }
}

//TODO apply check if user removing user admin
exports.removeParticipantFromGroupIfUAreAdmin = async (groupId, userId, userToBeRemoveFromGroupID) => {
  try {
    const threadUpdate = await Thread.getThread({ $and: [{ _id: groupId }, { isGroupAdmin: { $in: [userId] } }] })


    if (!threadUpdate) {
      return { message: "You Do Not Have Permission" }
    }

    const threadUpdateRes = await Thread.update(groupId, userToBeRemoveFromGroupID)
    const threadUpdateIsParticipant = await Thread.updateIsParticipant(groupId, userToBeRemoveFromGroupID)
    if (threadUpdateRes && threadUpdateIsParticipant) {
      return { message: "You are no longer participant of the group" }
    } else {
      return { message: "Group Exit Updation Failed" }
    }
  } catch (error) {
    throw error
  }
}