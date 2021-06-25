import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formHeader: {
    // margin: "25px",
    marginTop: "50px",
    marginBottom: "25px",
    fontWeight: 600
  },
}));

const Header = (props) => {
  const classes = useStyles();

  const message =
    props.type === "register" ? "Create an account." : "Welcome back!";

  return (
    <Typography className={classes.formHeader} variant="h4">
      {message}
    </Typography>
  );
};

export default Header;
