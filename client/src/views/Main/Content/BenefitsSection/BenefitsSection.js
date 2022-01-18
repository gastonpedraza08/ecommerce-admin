import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import PaymentIcon from "@material-ui/icons/Payment";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(7),
    },
  },
  itemBox: {
    display: "flex",
    "& .svg-icon": {
      marginRight: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        fontSize: "2.6rem",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "3rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "3.5rem",
      },
    },
  },
  container: {
    maxWidth: "100%",
    [theme.breakpoints.only("sm")]: {
      margin: "auto",
    },
  },
  containerMobile: {
    maxWidth: "100%",
    paddingLeft: theme.spacing(3),
    justifyContent: "start",
    flexDirection: "column",
  },
  body2: {
    color: theme.palette.text.secondary,
  },
}));

export default function BenefitsSection() {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <div className={classes.root}>
      <Grid
        container
        className={matches ? classes.containerMobile : classes.container}
        spacing={2}
      >
        <ItemGrid
          icon={LocalShippingIcon}
          h6="Envíos Gratis"
          body2="En miles de productos"
        />
        <ItemGrid
          icon={PaymentIcon}
          h6="Planes Ahora 12 y 18"
          body2="¡La mejor Cuota!"
        />
        <ItemGrid
          icon={VerifiedUserIcon}
          h6="30 Días"
          body2="Para devolver la compra"
        />
        <ItemGrid
          icon={AssignmentTurnedInIcon}
          h6="Garantía Oficial"
          body2="En todos los productos"
        />
      </Grid>
    </div>
  );
}

function ItemGrid(props) {
  const classes = useStyles();
  return (
    <Grid item sm={6} md={3} lg={3}>
      <Box className={classes.itemBox}>
        <props.icon className="svg-icon" />
        <div>
          <Typography variant="h6">{props.h6}</Typography>
          <Typography className={classes.body2} variant="body2">
            {props.body2}
          </Typography>
        </div>
      </Box>
    </Grid>
  );
}
