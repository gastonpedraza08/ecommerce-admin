import React, { useState } from "react";
import { useSelector } from 'react-redux';
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

export default function Profile(props) {
  const { className, ...rest } = props;
  const { user } = useSelector(state => state.auth);
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        src={user ? user.avatarUrl : ''}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
        {user ? user.firstName + " " + user.lastName : ''}
      </Typography>
      <Typography variant="body2">{user ? user.role.name : ''}</Typography>
    </div>
  );
}
