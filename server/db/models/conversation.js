const { Op } = require("sequelize");
const db = require("../db");
const User = require("./user");
const Message = require("./message");
const { findOnlineStatus } = require("../../helpers/onlineStatus");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id],
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id],
      },
    },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

// finds conversations sorted by their most recent messages
Conversation.findUsersConversations = async (userId) => {
  const conversations = await Conversation.findAll({
    where: {
      [Op.or]: {
        user1Id: userId,
        user2Id: userId,
      },
    },
    attributes: ["id"],
    order: [[Message, "createdAt", "ASC"]],
    include: [
      { model: Message },
      {
        model: User,
        as: "user1",
        where: {
          id: {
            [Op.not]: userId,
          },
        },
        attributes: ["id", "username", "photoUrl"],
        required: false,
      },
      {
        model: User,
        as: "user2",
        where: {
          id: {
            [Op.not]: userId,
          },
        },
        attributes: ["id", "username", "photoUrl"],
        required: false,
      },
    ],
  });

  conversations.sort(sortMessagesByDescendingDate);

  return conversations.map(prepareConversationsForFront);
};

const sortMessagesByDescendingDate = (previous, current) => {
  const previousTime = new Date(
    previous.messages[previous.messages.length - 1].createdAt
  );
  const currentTime = new Date(
    current.messages[current.messages.length - 1].createdAt
  );

  return currentTime - previousTime;
};

const prepareConversationsForFront = (element) => {
  const conversation = element.toJSON();

  // set a property "otherUser" so that frontend will have easier access

  if (conversation.user1) {
    conversation.otherUser = conversation.user1;
    delete conversation.user1;
  } else if (conversation.user2) {
    conversation.otherUser = conversation.user2;
    delete conversation.user2;
  }

  // set property for online status of the other user
  conversation.otherUser.online = findOnlineStatus(conversation.otherUser.id);

  // set properties for notification count and latest message preview
  conversation.latestMessageText = getLatestMessageText(conversation.messages);

  return conversation;
};

const getLatestMessageText = (messages) => {
  return {
    id: messages[messages.length - 1].id,
    text: messages[messages.length - 1].text,
    unread: messages[messages.length - 1].unread,
  };
};

module.exports = Conversation;
