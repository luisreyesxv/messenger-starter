import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "25px",
  },
  actionContainer: {
    boxShadow: "rgba(0, 0, 0, 0.15) 3px 3px 12px 2px",
    marginLeft: "50px",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  actionButton: {
    color: "#3A8DFF",
  },
}));

const ActionBar = () => {
  const classes = useStyles();
  const history = useHistory();

  let message;
  let action;
  let linkDestination;

  // we are doing this switch case so that the values change based on pathname, but also incase we want to add another type of form or
  // "welcome screen". default is current set with the same thing as "/register" because "/" is currently default to "/register" but that can change.
  switch (window.location.pathname) {
    case "/register":
      message = "Already have an account?";
      action = "Login";
      linkDestination = "/login";
      break;
    case "/login":
      message = "Don't have an account?";
      action = "Create account";
      linkDestination = "/register";
      break;
    default:
      message = "Already have an account?";
      action = "Login";
      linkDestination = "/login";
  }

  const clickHandler = () => {
    history.push(linkDestination);
  };

  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      spacing={0}
      className={classes.root}
    >
      <Grid item>
        <Typography color="secondary">{message}</Typography>
      </Grid>
      <Grid item className={classes.actionContainer}>
        <Button
          type="submit"
          size="large"
          fullWidth
          onClick={clickHandler}
          className={classes.actionButton}
        >
          {action}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActionBar;
