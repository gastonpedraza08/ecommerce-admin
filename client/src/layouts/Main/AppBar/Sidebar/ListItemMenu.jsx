import React from "react";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  arrow: {
    border: `solid ${theme.palette.common.black}`,
    borderWidth: "0 2px 2px 0",
    display: "inline-block",
    padding: "2px",
    transform: "rotate(-45deg)",
    marginLeft: "3px",
  },
  listItemMenu: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function ListItemMenu(props) {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <ListItem
        className={classes.listItemMenu}
        style={{ fontWeight: show ? 500 : 400 }}
        button
        onClick={() => setShow((prev) => !prev)}
      >
        <span>{props.label}</span>
        <div
          className={classes.arrow}
          style={show ? { transform: "rotate(45deg)" } : null}
        ></div>
      </ListItem>
      <Box display={show ? "block" : "none"}>
        <List style={{ paddingLeft: 12, paddingRight: 12 }}>
          {props.children}
        </List>
      </Box>
    </div>
  );
}
