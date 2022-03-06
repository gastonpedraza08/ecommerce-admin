import React, { useEffect } from "react";
import { Switch, Redirect, Route, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

//views
import {
  SignInView,
  SignUpView,
  ActivationView,
} from './views';

export default function Routes() {
  const history = useHistory();
  const { login } = useSelector(state => state.auth);

  useEffect(() => {
    if (login.success) {
      history.push('/');
    }
  }, [login.success, history]);

  return (
    <Switch>
      <Route exact path="/auth/login" component={SignInView} />
      <Route exact path="/auth/register" component={SignUpView} />
      <Route exact path="/auth/activate/:token" component={ActivationView} />
      <Redirect to="/not-found" />
    </Switch>
  );
}
