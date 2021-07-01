const onlineUsers = require("../onlineUsers");

const findOnlineStatus = (userId) => {
  return onlineUsers.has(userId);
};

const addUserOnline = (id) => {
  if (findOnlineStatus(id)) {
    onlineUsers.add(id);
    return true;
  } else false;
};

const removeUserOnline = () => {
  return onlineUsers.remove(id);
};
module.exports = { findOnlineStatus, addUserOnline, removeUserOnline };
