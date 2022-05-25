import React, { useEffect } from "react";
import { Switch, Redirect, Route, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

//views
import {
  SignInView,
  SignInAdminView,
  SignUpView,
  ActivationView,
} from './views';

export default function Routes() {

  return (
    <Switch>
      <Route exact path="/auth/activate/:token" component={ActivationView} />
      <AuthProtect>
        <Route exact path="/auth/admin" component={SignInAdminView} />
        <Route exact path="/auth/login" component={SignInView} />
        <Route exact path="/auth/register" component={SignUpView} />
      </AuthProtect>
      <Redirect to="/not-found" />
    </Switch>
  );
}

function AuthProtect(props) {
  const history = useHistory();
  const { login } = useSelector(state => state.auth);

  useEffect(() => {
    if (login.isLoggedIn) {
      history.push('/');
    }
  }, [login.isLoggedIn, history]);

  return (
    <>
      {props.children}
    </>
  );
}