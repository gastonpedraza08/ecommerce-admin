import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

//views
import AccountView from './Account';
import DashboardView from './Dashboard';
import IntegrationView from './Integration';
import NotFoundView from './NotFound';
import ProductsView from './Products';
import SettingsView from './Settings';
import UserListView from './Users';

export default function Routes() {

  return (
    <Switch>
      <Route exact path="/admin/account" component={AccountView} />
      <Route exact path="/admin/dashboard" component={DashboardView} />
      <Route path="/admin/integration" component={IntegrationView} />
      <Route exact path="/admin/not-found" component={NotFoundView} />
      <Route path="/admin/products" component={ProductsView} />
      <Route exact path="/admin/settings" component={SettingsView} />
      <Route path="/admin/users" component={UserListView} />
      <Redirect to="/not-found" />
    </Switch>
  );
}
