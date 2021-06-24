import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { markConversationAsRead } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  unreadNumber: {
    backgroundColor: "#3A8DFF",
    color: "white",
    borderRadius: "10px",
    padding: "5px 10px",
    fontWeight: "600",
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    await this.props.setActiveChat(conversation.otherUser.username);
    await this.props.markConversationAsRead({
      conversationId: conversation.id,
    });
  };

  notificationButton = () => {
    const { classes } = this.props;
    if (this.props.conversation.unreadCount) {
      return (
        <Box className={classes.unreadNumber}>
          {this.props.conversation.unreadCount}
        </Box>
      );
    }
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />

        <ChatContent conversation={this.props.conversation} />
        {this.notificationButton()}
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    markConversationAsRead: (id) => {
      dispatch(markConversationAsRead(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
