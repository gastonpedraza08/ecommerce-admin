import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

export default function Footer(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{" "}
        <Link component="a" href="https://some/" target="_blank">
          Magazinca
        </Link>
        . 2019
      </Typography>
      <Typography variant="caption">
        Creado por Gastón Pedraza. Desarrollador web full stack.
      </Typography>
    </div>
  );
}
