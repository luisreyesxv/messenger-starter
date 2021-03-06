const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { findOnlineStatus } = require("../../helpers/onlineStatus");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const conversation = await Conversation.findByPk(conversationId);

      // this is confirming that the person sending the message is actually part of the conversation
      if (
        conversation.user1Id === senderId ||
        conversation.user2Id === senderId
      ) {
        const message = await Message.create({
          senderId,
          text,
          conversationId,
        });
        return res.json({ message, sender });
      } else return res.sendStatus(403);
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    // 
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });

      sender.online = findOnlineStatus(sender.id);
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });

    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// expects {conversationId } in body
router.patch("/read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { conversationId } = req.body;
    const lastReadId = await Message.findUsersLastReadConversationMessage(
      conversationId,
      senderId
    );
    if (Message.markAsRead(conversationId, senderId)) {
      return res.json({ id: conversationId, lastRead: lastReadId });
    } else return res.sendStatus(500);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
