import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/styles";

import { UsersToolbar, UsersTable } from "./components";

import { usersLoadAllusers } from 'actions/users';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { users } = useSelector(state => state.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(usersLoadAllusers());
    }
  }, [dispatch, users.length])

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
