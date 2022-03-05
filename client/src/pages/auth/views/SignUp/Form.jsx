import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  TextField,
  Link,
  Checkbox,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

import { authRegister } from "actions/auth";

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
  textField: {
    marginTop: theme.spacing(2),
  },
  policy: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  policyCheckbox: {
    marginLeft: "-14px",
  },
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
}));

export default function FormRegister(props) {

	const dispatch = useDispatch();
  const { register } = useSelector(state => state.auth);

  const [formValues, setFormValues] = useState({
    firstName: 'gaston',
    lastName: 'pedraza',
    email: 'gastonpedraza.developer@gmail.com',
    password: 'abcd1234',
    checked: true
  });

  const classes = useStyles();

  const handleChange = e => {
    setFormValues(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleCheck = e => {
    setFormValues(prev => {
      return {
        ...prev,
        checked: !prev.checked
      }
    })
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    dispatch(authRegister(formValues));
    //history.push("/");
  };

	return (
		<form className={classes.form} onSubmit={handleSignUp}>
      <Typography className={classes.title} variant="h2">
        Crea una nueva cuenta
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        Usa un email para crear una nueva cuenta
      </Typography>
      <TextField
        className={classes.textField}
        fullWidth
        label="Nombre"
        name="firstName"
        onChange={handleChange}
        value={formValues.firstName}
        type="text"
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="Apellido"
        name="lastName"
        onChange={handleChange}
        value={formValues.lastName}
        type="text"
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="Email"
        name="email"
        onChange={handleChange}
        value={formValues.email}
        type="text"
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="Contraseña"
        name="password"
        onChange={handleChange}
        value={formValues.password}
        type="password"
        variant="outlined"
      />
      <div className={classes.policy}>
        <Checkbox
          checked={formValues.checked}
          onChange={handleCheck}
          className={classes.policyCheckbox}
          color="primary"
          name="policy"                    
        />
        <Typography
          className={classes.policyText}
          color="textSecondary"
          variant="body1"
        >
          He leído los {" "}
          <Link
            color="primary"
            component={RouterLink}
            to="#"
            underline="always"
            variant="h6"
          >
            Terminos y Condiciones
          </Link>
        </Typography>
      </div>
      <div>
        {
          register.error && <RegisterErrorMessage error={register.error} />
        }        
      </div>
      <Button
        className={classes.signUpButton}
        color="primary"
        disabled={register.isLoading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
      >
        Crear Cuenta
      </Button>
      <Typography color="textSecondary" variant="body1">
        ¿Ya tienes una cuenta?{" "}
        <Link component={RouterLink} to="/auth/login" variant="h6">
          Iniciar Sesion
        </Link>
      </Typography>
    </form>
	);
}

function RegisterErrorMessage(props) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <p>
        {props.error}
      </p>
    </Alert>
  );
}