import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography
} from "@material-ui/core";

import FormRegister from './Form.jsx';

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
  registerSuccessContainer: {
    height: '100%',
    marginTop: theme.spacing(10)
  },
}));

const SignUp = (props) => {

  const { register } = useSelector(state => state.auth);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justifyContent="center">
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              {
                !register.success ?
                (
                  <FormRegister />
                )
                :
                (
                  <div className={classes.registerSuccessContainer}>
                    <Typography className={classes.title} variant="h2">
                      Correcto
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Te hemos enviado el link de activacíón a tu dirección de correo electronico.
                    </Typography>
                  </div>
                )
              }
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};


export default SignUp;