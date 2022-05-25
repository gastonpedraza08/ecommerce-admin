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
      <Route exact path="/auth/admin" component={SignInAdminView} />
      <AuthProtect>
        <Route exact path="/auth/login" component={SignInView} />
        <Route exact path="/auth/register" component={SignUpView} />
      </AuthProtect>
      <Redirect to="/not-found" />
    </Switch>
  );
}

function AuthProtect(props) {
  const history = useHistory();
  const { login, isLoggedIn } = useSelector(state => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history]);

  return (
    <>
      {props.children}
    </>
  );
}