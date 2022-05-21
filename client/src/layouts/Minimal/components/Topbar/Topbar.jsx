import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CustomRouterLink from 'components/CustomRouterLink';
import IconButton from "@material-ui/core/IconButton";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  title: {
    flexGrow: 1,
    '& a': {
      color: theme.palette.primary.contrastText,
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleText: {
    color: 'white!important'
  }
}));

export default function Topbar(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <div style={{ display:'flex', alignItems: 'center'}}>
          <IconButton edge="start" component={CustomRouterLink} to="/" className={classes.menuButton} color="inherit">
            <StorefrontIcon />
          </IconButton>
          <Typography variant="h6" className={classes.titleText} component={CustomRouterLink} to="/">
            MAGAZINCA
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}
