import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { Facebook as FacebookIcon, Google as GoogleIcon } from "icons";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  socialButtons: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("xs")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("sm")]: {
      justifyContent: "left",
    },
  },
  socialIcon: {
    marginRight: theme.spacing(1),
  },
  sugestion: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
}));

export default function SignIn(props) {
  const { history } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justifyContent="center">
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form}>
                <Typography className={classes.title} variant="h2">
                  Inicia Sesion
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Con una red social
                </Typography>
                <Grid className={classes.socialButtons} container spacing={1}>
                  <Grid item>
                    <Button color="primary" size="large" variant="contained">
                      <FacebookIcon className={classes.socialIcon} />
                      Entrar con facebook
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button size="large" variant="contained">
                      <GoogleIcon className={classes.socialIcon} />
                      Entrar con Google
                    </Button>
                  </Grid>
                </Grid>
                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  o con una direccion de correo electronico
                </Typography>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Correo Electronico"
                  name="email"
                  type="text"
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type="password"
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Iniciar Sesion
                </Button>
                <Typography color="textSecondary" variant="body1">
                  ¿No tienes una cuenta?
                  <Link component={RouterLink} to="/admin/sign-up" variant="h6">
                    Crear Cuenta
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
