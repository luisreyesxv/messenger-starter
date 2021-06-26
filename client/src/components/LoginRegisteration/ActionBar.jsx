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

const ActionBar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const message =
    props.type === "/register" ? "Need to log in?" : "Already have an account?";
  const action = props.type === "/register" ? "Login" : "Create account";
  const linkDestination = props.type === "/register" ? "/login" : "/register";

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
      <Grid item button className={classes.actionContainer}>
        <Button
          type="submit"
          size="large"
          fullwidth
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
