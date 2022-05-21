import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/styles";
import jwt from 'jsonwebtoken';

import { Sidebar, Topbar, Footer } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: "100%",
  },
}));

export default function Admin(props) {
  const { children } = props;
  const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  useEffect(() => {
    let access_token = localStorage.getItem('access_token');
    jwt.verify(access_token, process.env.REACT_APP_JWT_SECRET, (err, decoded) => {
      if (err) {
        localStorage.removeItem('access_token');
        history.push('/auth/admin');
      } else {
        if (decoded.role.name === "admin") {
        } else {
          localStorage.setItem('admin', JSON.stringify(decoded));
          localStorage.removeItem('access_token');
          history.push('/auth/admin');
        }
      }
    });
  }, [history]);

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
}
