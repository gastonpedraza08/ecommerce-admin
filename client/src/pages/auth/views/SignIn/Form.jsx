import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

import { authLogin } from 'actions/auth';
import { Facebook as FacebookIcon, Google as GoogleIcon } from "icons";

const useStyles = makeStyles((theme) => ({
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
  loginError: {
  	marginTop: theme.spacing(2)
  }
}));

export default function SignIn(props) {

	const dispatch = useDispatch();
  const classes = useStyles();

  const { login } = useSelector(state => state.auth);

  const [formValues, setFormValues] = useState({
  	email: 'gp.ju.dev@gmail.com',
  	password: 'abcd1234'
  });

  const handleChange = e => {
  	setFormValues(prev => {
  		return {
  			...prev,
  			[e.target.name]: e.target.value
  		}
  	})
  }

  const handleSignIn = e => {
  	e.preventDefault();
  	dispatch(authLogin(formValues));
  }

  return (
    <form className={classes.form} onSubmit={handleSignIn}>
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
        onChange={handleChange}
        value={formValues.email}
        name="email"
        type="text"
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="Contraseña"
        onChange={handleChange}
        value={formValues.password}
        name="password"
        type="password"
        variant="outlined"
      />
      {
      	login.error ?
      	(
		      <div className={classes.loginError}>
		      	<Alert severity="error">
				      <AlertTitle>Error</AlertTitle>
				      <p>
				        {login.error}
				      </p>
				    </Alert>
		      </div>
      	)
      	:
      	(null)
      }
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
        <Link component={RouterLink} to="/auth/register" variant="h6">
          Crear Cuenta
        </Link>
      </Typography>
    </form>
  );
}
