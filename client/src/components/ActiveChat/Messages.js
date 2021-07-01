import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import TypingBubble from "./TypingBubble";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, lastRead, typing, id } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            messageId={message.id}
            lastRead={lastRead}
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
      {typing?.has(id) && (
        <TypingBubble
          key={"typing bubble"}
          text={"..."}
          otherUser={otherUser}
        />
      )}
    </Box>
  );
};

export default Messages;
