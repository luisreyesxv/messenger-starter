const { Op, Sequelize } = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  unread: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

Message.markAsRead = async function (conversationId, userId) {
  await Message.update(
    { unread: false },
    {
      where: {
        [Op.not]: [{ senderId: userId }],
        conversationId: {
          [Op.eq]: conversationId,
        },
      },
    }
  );
};

Message.findUnreadCount = async function (conversationId, senderId) {
  const unreadCount = await Message.count({
    where: {
      [Op.and]: [{ unread: true }, { conversationId: conversationId }],
      senderId: {
        [Op.ne]: senderId,
      },
    },
  });

  return unreadCount;
};

Message.findUsersLastReadConversationMessage = async function (
  conversationId,
  senderId
) {
  const lastReadId = await Message.findAll({
    where: {
      [Op.and]: [
        { unread: false },
        { conversationId: conversationId },
        { senderId: senderId },
      ],
    },
    limit: 1,
    order: [["createdAt", "DESC"]],
  });

  return lastReadId[0]?.id;
};

module.exports = Message;
