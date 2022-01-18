import React from "react";
import { makeStyles } from "@material-ui/styles";

import { Topbar } from "./components";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: "100%",
  },
  content: {
    height: "100%",
  },
}));

export default function Minimal(props) {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
}
