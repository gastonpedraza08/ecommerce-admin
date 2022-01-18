import React, { useState, useEffect } from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

import {
  Main as MainView,
  Slides as SlidesView,
  Products as ProductsView,
  CreateProductsSection as CreateProductsSectionView,
} from "./views";

import Breadcrumbs from "components/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  breadcrumbs: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function Routes() {
  const classes = useStyles();
  const location = useLocation();

  const [historyBreadcrumbs, setHistoryBreadcrumbs] = useState("");

  useEffect(() => {
    setHistoryBreadcrumbs(location.pathname.split("/admin")[1]);
  }, [location]);

  return (
    <div className={classes.root}>
      <Breadcrumbs
        historyBreadcrumbs={historyBreadcrumbs}
        className={classes.breadcrumbs}
      />
      <Switch>
        <Route exact path="/admin/integration/slides" component={SlidesView} />
        <Route exact path="/admin/integration/products" component={ProductsView} />
        <Route exact path="/admin/integration/products/create-section" component={CreateProductsSectionView} />
        <Route exact path="/admin/integration/" component={MainView} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}
