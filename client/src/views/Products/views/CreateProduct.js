import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { FormProduct } from "../components";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  modal: {
    backgroundColor: "#fff",
  },
}));

export default function CreateProduct(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2">Create Product</Typography>
      <FormProduct />
    </div>
  );
}
