import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    [theme.breakpoints.up("xs")]: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: 40,
      paddingRight: 40,
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: 50,
      paddingRight: 50,
    },
  },
}));

export default function Container(props) {
  const classes = useStyles();
  return (
    <div className={classes.root} {...props}>
      {props.children}
    </div>
  );
}
