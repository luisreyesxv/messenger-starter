import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { register } from "./store/utils/thunkCreators";
import ActionBar from "./components/LoginRegisteration/ActionBar";
import Header from "./components/LoginRegisteration/Header";
import QuoteSideBar from "./components/LoginRegisteration/QuoteSideBar";

const useStyles = makeStyles((theme) => ({
  mainGrid:{
    height: "100vh"
  },
  mainButton: {
    margin: "25px",
    backgroundColor: "#3A8DFF",
    color: "white",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const type = "register";

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="center" className={classes.mainGrid}>
      <Hidden smDown>
        <QuoteSideBar />
      </Hidden>
      <Grid item xs={12} sm={7} md={7}>
        <Grid container direction="row" justify="center" alignItems="center">
          <ActionBar type={type} />
          <Grid item xs={8}>
            <Header type={type} />

            <form onSubmit={handleRegister}>
              <Grid container xs={12}>
                <Grid item xs={12}>
                  <FormControl margin="normal" color="primary" fullWidth>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12}>
                  <FormControl margin="normal" color="primary" fullWidth>
                    <TextField
                      label="E-mail address"
                      aria-label="e-mail address"
                      type="email"
                      name="email"
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12}>
                  <FormControl
                    margin="normal"
                    color="primary"
                    fullWidth
                    error={!!formErrorMessage.confirmPassword}
                  >
                    <TextField
                      aria-label="password"
                      label="Password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="password"
                    />
                    <FormHelperText xs={12}>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid xs={12}>
                  <FormControl
                    margin="normal"
                    color="primary"
                    fullWidth
                    error={!!formErrorMessage.confirmPassword}
                  >
                    <TextField
                      label="Confirm Password"
                      aria-label="confirm password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="confirmPassword"
                      fullWidth
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                  <Grid container item justify="center" xs={12}>
                    <Button
                      className={classes.mainButton}
                      type="submit"
                      variant="contained"
                      size="large"
                      fullwidth
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
