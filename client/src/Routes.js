import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components";
import { 
	Admin as AdminLayout, 
	Minimal as MinimalLayout,
	Main as MainLayout
	} from "./layouts";
import Main from "./pages/main/Main";

import {
  Dashboard as DashboardView,
  Products as ProductsView,
  UserList as UserListView,
  Typography as TypographyView,
  Integration as IntegrationRoutes,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  SearchProduct as SearchProductView,
  Product as ProductView,
} from "./pages";

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={ProductsView}
        layout={AdminLayout}
        path="/admin/products"
      />
      <RouteWithLayout
        component={IntegrationRoutes}
        layout={AdminLayout}
        path="/admin/integration"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={AdminLayout}
        path="/admin/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={AdminLayout}
        path="/admin/users"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={AdminLayout}
        path="/admin/typography"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={AdminLayout}
        path="/admin/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={AdminLayout}
        path="/admin/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/admin/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/admin/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
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
        component={Main}
        exact
        layout={MainLayout}
        path="/"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
