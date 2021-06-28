import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import ActionBar from "./ActionBar";
import Header from "./Header";
import QuoteSideBar from "./QuoteSideBar";

const FormHOC = (Component) => {
  return (props) => (
    <Grid container justify="center" style={{ height: "100vh" }}>
      <Hidden smDown>
        <QuoteSideBar />
      </Hidden>
      <Grid item xs={12} sm={7} md={7}>
        <Grid container direction="row" justify="center" alignItems="center">
          <ActionBar />
          <Grid item xs={8}>
            <Header />

            <Component {...props} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormHOC;
