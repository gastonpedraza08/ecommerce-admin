import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import { CustomRouterLink } from "components";

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    height: "42px",
    marginTop: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

const UsersToolbar = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <Button 
          color="primary" 
          variant="contained"
          component={CustomRouterLink}
          to="/admin/users/create"
        >
          AGREGAR USUARIO
        </Button>
      </div>
    </div>
  );
};

export default UsersToolbar;
