import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";
import { addTyping, removeTyping } from "./store/typing";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on("now-typing", (id) => {
    store.dispatch(addTyping(id));
  });
  socket.on("stopped-typing", (id) => {
    store.dispatch(removeTyping(id));
  });
});

socket.on("connect_error", () => {
  socket.disconnect();
  console.log("this is disconnecting due to error");
});

export default socket;
