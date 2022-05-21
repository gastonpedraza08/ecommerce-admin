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
      <AuthAdminProtect>
        <Route exact path="/auth/admin" component={SignInAdminView} />
      </AuthAdminProtect>
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
  const { login } = useSelector(state => state.auth);

  useEffect(() => {
    if (login.success) {
      history.push('/');
    }
  }, [login.success, history]);

  return (
    <>
      {props.children}
    </>
  );
}

function AuthAdminProtect(props) {
  const history = useHistory();
  const { login, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (login.success) {
      if (user.role.name == "admin") {
        history.push('/admin/users');
      } else {
        localStorage.deleteItem('access_token');
      }
    }
  }, [login.success, history]);

  return (
    <>
      {props.children}
    </>
  );
}