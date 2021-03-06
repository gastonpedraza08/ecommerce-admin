import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LayersIcon from "@material-ui/icons/Layers";

import DashboardIcon from "@material-ui/icons/Layers";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";

import { Profile, SidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Sidebar(props) {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <DashboardIcon />,
      disabled: true,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <PeopleIcon />,
      disabled: false,
    },
    {
      title: "Products",
      href: "/admin/products",
      icon: <ShoppingBasketIcon />,
      disabled: false,
    },
    {
      title: "Integration",
      href: "/admin/integration",
      icon: <LayersIcon />,
      disabled: false,
    },
    {
      title: "Account",
      href: "/admin/account",
      icon: <AccountBoxIcon />,
      disabled: true,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <SettingsIcon />,
      disabled: true,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
}
