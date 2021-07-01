import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Icon, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    color: "white",
    backgroundImage:
      "linear-gradient(to bottom, RGBA(58, 141, 255, .85), RGBA(134, 185, 255, .85)),url('/Login-Register/bg-img.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
  },
  message: {
    height: "100vh",
  },
}));

const QuoteSideBar = () => {
  const classes = useStyles();

  return (
    <Grid item sm={5} md={5} className={classes.root}>
      <Grid container item alignItems="center" justify="center" align="center">
        <Grid
          container
          item
          xs={9}
          className={classes.message}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid container justify="center">
            <Grid item md={12}>
              <Icon>
                <img alt="" src="/Login-Register/bubble.svg" />
              </Icon>
            </Grid>
            <Grid container item justify="center" md={12}>
              <Typography variant="h4">
                Converse with anyone with any language
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuoteSideBar;
