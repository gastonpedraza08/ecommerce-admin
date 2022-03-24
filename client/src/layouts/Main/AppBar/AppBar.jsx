import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";

import { makeStyles } from "@material-ui/core/styles";

import MainBar from "./MainBar";
import MenuNavBar from "./MenuNavBar";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
  },
}));

export default function MenuAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="relative" className={classes.appBar}>
        <MainBar />
        <Hidden smDown>
          <MenuNavBar />
        </Hidden>
        <Sidebar />
      </AppBar>
    </div>
  );
}
