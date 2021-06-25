import React, { Component } from "react";
import { Box, Badge } from "@material-ui/core";
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
    fontWeight: "600",
    padding: ".25rem .5rem .25rem .5rem",
  },
};

class Chat extends Component {
  handleClick = async (conversation) => {
    const { activeConversation } = this.props;
    await this.props.setActiveChat(conversation.otherUser.username);

    if (
      !activeConversation ||
      conversation.otherUser.username !== activeConversation
    ) {
      await this.props.markConversationAsRead({
        conversationId: conversation.id,
      });
    }
  };

  notificationButton = () => {
    const { classes } = this.props;
    const messageNumber = this.props.conversation.unreadCount;
    const displayNumber =
      !messageNumber ||
      messageNumber < 1 ||
      this.conversation?.otherUser.username === this.props.activeConversation;

    return (
      <Badge
        badgeContent={messageNumber}
        max={999}
        invisible={displayNumber}
        classes={{ badge: classes.unreadNumber }}
      />
    );
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

const mapStateToProps = (state) => {
  return {
    activeConversation: state.activeConversation,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat));
