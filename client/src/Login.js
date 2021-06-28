import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Button, FormControl, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import FormHOC from "./components/LoginRegisteration/FormHOC";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    height: "100vh",
  },
  mainButton: {
    margin: "25px",
    backgroundColor: "#3A8DFF",
    color: "white",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <form onSubmit={handleLogin}>
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
          <FormControl margin="normal" required fullWidth>
            <TextField
              label="Password"
              aria-label="password"
              type="password"
              name="password"
              fullWidth
            />
          </FormControl>
        </Grid>

        <Grid container item justify="center" xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            className={classes.mainButton}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormHOC(Login));
