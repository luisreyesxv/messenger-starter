export const addMessageToStore = (state, payload) => {
  const { message, sender, currentUser } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadCount: currentUser ? 0 : 1,
    };
    newConvo.latestMessageText = {
      id: message.id,
      text: message.text,
      unread: message.unread,
    };
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      if (!currentUser) convoCopy.unreadCount++;
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = {
        id: message.id,
        text: message.text,
        unread: message.unread,
      };

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = {
        id: message.id,
        text: message.text,
        unread: message.unread,
      };
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const updateConversationInStore = (state, payload) => {
  const targetConversationId = payload.id;
  const lastReadMessageId = payload.lastRead;
  return state.map((convo) => {
    if (convo.id === targetConversationId) {
      const convoCopy = { ...convo };
      convoCopy.unreadCount = 0;
      convoCopy.lastRead = lastReadMessageId;
      convoCopy.latestMessageText.unread = false;

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addTyper = (state, data) => {
  const newSet = new Set([...state])
  newSet.add(data.id)
  return newSet
};

export const removeTyper = (state, data) => {
  if(state.has(data.id)){
    const newSet = new Set([...state])
    newSet.delete(data.id)
    return newSet
  }
  else {
    return state
  }
};
