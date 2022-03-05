import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

//views
import {
  SignInView,
  SignUpView
} from './views';

export default function Routes() {

  return (
    <Switch>
      <Route exact path="/auth/login" component={SignInView} />
      <Route exact path="/auth/register" component={SignUpView} />
      <Redirect to="/not-found" />
    </Switch>
  );
}
