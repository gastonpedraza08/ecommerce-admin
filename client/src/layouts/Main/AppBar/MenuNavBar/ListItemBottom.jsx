import React from "react";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItemBottom: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textTransform: "none",
    marginBottom: 0,
    "& .arrow": {
      border: `solid ${theme.palette.primary.contrastText}`,
      borderWidth: "0 2px 2px 0",
      display: "inline-block",
      padding: "2px",
      transform: "rotate(45deg)",
      marginLeft: "3px",
    },
  },
  menu: {
    padding: 0,
    position: "relative",
    "& > ul": {
      width: "auto",
      minWidth: "100%",
      position: "absolute",
      top: "100%",
      left: "0%",
      display: "none",
      listStyleType: "none",
      padding: 0,
      margin: 0,
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

export default function ListItemBottom(props) {
  const classes = useStyles();

  return (
    <div className={classes.menu}>
      <MenuItem disableRipple className={classes.listItemBottom}>
        <span>{props.label}</span>
        <i className="arrow"></i>
      </MenuItem>
      <List>{props.children}</List>
    </div>
  );
}
