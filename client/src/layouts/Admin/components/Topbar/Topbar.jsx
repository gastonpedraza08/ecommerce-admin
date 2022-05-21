import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import StorefrontIcon from "@material-ui/icons/Storefront";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";

import CustomRouterLink from 'components/CustomRouterLink';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
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
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <div style={{ display:'flex', alignItems: 'center'}}>
          <IconButton edge="start" component={CustomRouterLink} to="/" className={classes.menuButton} color="inherit">
            <StorefrontIcon />
          </IconButton>
          <Typography variant="h6" className={classes.titleText} component={CustomRouterLink} to="/">
            MAGAZINCA
          </Typography>
        </div>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
