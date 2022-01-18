import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CurrentSlides from "../components/CurrentSlides";
import AllSlides from "../components/AllSlides";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

export default function Slides(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CurrentSlides />
      <AllSlides />
    </div>
  );
}
