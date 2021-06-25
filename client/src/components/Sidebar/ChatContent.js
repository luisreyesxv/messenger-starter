import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  boldPreviewText: {
    fontSize: 12,
    color: "#000000",
    letterSpacing: -0.17,
    fontWeight: "bolder",
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const previewText = () => {
    const lastMessage =
      conversation?.messages[conversation.messages.length - 1];
    const isLastMessageFromUser =
      lastMessage?.senderId === otherUser?.id && latestMessageText?.unread;
    const className = isLastMessageFromUser
      ? classes.boldPreviewText
      : classes.previewText;

    return (
      <Typography className={className}>{latestMessageText?.text}</Typography>
    );
  };

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        {previewText()}
      </Box>
    </Box>
  );
};

export default ChatContent;
