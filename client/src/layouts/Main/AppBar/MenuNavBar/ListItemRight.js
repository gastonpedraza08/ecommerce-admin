import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  listItemRight: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textTransform: "none",
    display: "flex",
    justifyContent: "space-between",
    "& .arrow": {
      border: `solid ${theme.palette.primary.contrastText}`,
      borderWidth: "0 2px 2px 0",
      display: "inline-block",
      padding: "2px",
      transform: "rotate(-45deg)",
      marginLeft: "3px",
    },
  },
  menu: {
    position: "relative",
    "& > ul": {
      position: "absolute",
      width: "auto",
      minWidth: "100%",
      listStyleType: "none",
      padding: 0,
      margin: 0,
      top: "0%",
      left: "100%",
      display: "none",
      backgroundColor: theme.palette.primary.dark,
    },
    "&:hover > ul": {
      display: "block",
      zIndex: 100,
    },
    "&:hover > li": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function ListItemRight(props) {
  const classes = useStyles();

  return (
    <div className={classes.menu}>
      <MenuItem disableRipple className={classes.listItemRight}>
        {props.label}
        <i className="arrow"></i>
      </MenuItem>
      <List>{props.children}</List>
    </div>
  );
}
