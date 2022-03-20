import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components";
import { 
	Admin as AdminLayout, 
	Minimal as MinimalLayout,
	Main as MainLayout
	} from "./layouts";

import {
  Main as MainView,
  SearchProduct as SearchProductView,
  Product as ProductView,
  Admin as AdminView,
  Auth as AuthView,
} from "./pages";

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={AdminView}
        layout={AdminLayout}
        path="/admin"
      />
      <RouteWithLayout
        component={SearchProductView}
        exact
        layout={MainLayout}
        path="/results"
      />
      <RouteWithLayout
        component={ProductView}
        exact
        layout={MainLayout}
        path="/product/:id"
      />
      <RouteWithLayout
        component={AuthView}
        layout={MinimalLayout}
        path="/auth"
      />
      <RouteWithLayout
        component={MainView}
        exact
        layout={MainLayout}
        path="/"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
