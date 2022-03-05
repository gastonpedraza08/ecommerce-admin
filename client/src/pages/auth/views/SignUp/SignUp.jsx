import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  TextField,
  Link,
  Checkbox,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
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

const SignUp = (props) => {
  const { history } = props;

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
    console.log(formValues)
    //history.push("/");
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justifyContent="center">
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
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
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={false}
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
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;