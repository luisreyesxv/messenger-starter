const router = require("express").Router();
const { User } = require("../../db/models");

// find users by username
router.get("/:username", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;

    const users = await User.searchOtherUsersByName(req.user.id, username);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
