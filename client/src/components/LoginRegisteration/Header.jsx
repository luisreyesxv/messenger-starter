import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formHeader: {
    marginTop: "50px",
    marginBottom: "25px",
    fontWeight: 600,
  },
}));

const Header = (props) => {
  const classes = useStyles();

  let message;

  // we are doing this switch case so that the values change based on pathname, but also incase we want to add another type of form or
  // "welcome screen". default is current set with the same thing as "/register" because "/" is currently default to "/register" but that can change.
  switch (window.location.pathname) {
    case "/register":
      message = "Create an account.";
      break;
    case "/login":
      message = "Welcome Back!";
      break;
    default:
      message = "Create an account.";
  }

  return (
    <Typography className={classes.formHeader} variant="h4">
      {message}
    </Typography>
  );
};

export default Header;
