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
  socket.on("now-typing", (data) => {
    store.dispatch(addTyping(data));
  });
  socket.on("stopped-typing", (data) => {
    store.dispatch(removeTyping(data));
  });
});

socket.on("connect_error", () => {
  socket.disconnect();
  console.log("this is disconnecting due to error");
});

socket.on("connect_error", (err) =>{
  socket.disconnect();
  console.log(err.message)
})



export default socket;
