import React, { useState, useCallback, useEffect } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import debounce from "lodash.debounce";
import socket from "../../socket";

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
};

const Input = (props) => {
  const [text, setText] = useState("");
  const [stoppingTimeout, setStoppingTimeout] = useState();
  const { classes } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const sendTypingSignal = async () => {
    clearTimeout(stoppingTimeout);
    if (text) {
      socket.emit("now-typing", {
        recipientId: props.otherUser.id,
        id: props.conversationId,
      });

      const newTimeout = await setTimeout(
        () =>
          socket.emit("stopped-typing", {
            recipientId: props.otherUser.id,
            id: props.conversationId,
          }),
        2000
      );
      setStoppingTimeout(newTimeout);
    }
  };

  const debouncedFunction = useCallback(debounce(sendTypingSignal, 250), [text]);

  useEffect(() => {
    debouncedFunction();

    return debouncedFunction.cancel;
  }, [text, debouncedFunction]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: props.otherUser.id,
      conversationId: props.conversationId,
      sender: props.conversationId ? null : props.user,
    };
    await props.postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
