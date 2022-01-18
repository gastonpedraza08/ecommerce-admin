import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles, alpha } from "@material-ui/core/styles";

import ListItemBottom from "./ListItemBottom";
import ListItemRight from "./ListItemRight";

const useStyles = makeStyles((theme) => ({
  toolBar: {
    borderTop: `1px solid ${theme.palette.primary.contrastText}`,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
    display: "flex",
    justifyContent: "center",
    "& *": {
      color: theme.palette.primary.contrastText,
    },
  },
  menuItemLink: {
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolBar}>
      <ListItemBottom label="Celulares y Teléfonos">
        <MenuItemLink href="/some">Celulares y Smartphones</MenuItemLink>
        <MenuItemLink href="/some">Accesorios para Celulares</MenuItemLink>
      </ListItemBottom>
      <ListItemBottom label="Cámaras y Accesorios">
        <MenuItemLink>Cámaras Digitales</MenuItemLink>
        <MenuItemLink>Accesorios para Cámaras</MenuItemLink>
      </ListItemBottom>
      <ListItemBottom label="Consolas y Videojuegos">
        <MenuItemLink>Videojuegos</MenuItemLink>
        <ListItemRight label="Para PlayStation">
          <MenuItemLink>Gamepads y Joystick</MenuItemLink>
          <MenuItemLink>Consolas y Accesorios</MenuItemLink>
        </ListItemRight>
      </ListItemBottom>
      <ListItemBottom label="Computación">
        <MenuItemLink>Componentes de PC</MenuItemLink>
        <MenuItemLink>Impresión</MenuItemLink>
        <MenuItemLink>Tablets y Accesorios</MenuItemLink>
        <MenuItemLink>PC</MenuItemLink>
      </ListItemBottom>
      <ListItemBottom label="Electrónica, Audio y Video">
        <MenuItemLink>Audio</MenuItemLink>
        <MenuItemLink>Accesorios para Audio y Video</MenuItemLink>
        <MenuItemLink>Componentes Electrónicos</MenuItemLink>
        <MenuItemLink>Drones y Accesorios</MenuItemLink>
      </ListItemBottom>
    </Toolbar>
  );
}

function MenuItemLink(props) {
  const classes = useStyles();
  return (
    <MenuItem className={classes.menuItemLink} component="a" {...props}>
      {props.children}
    </MenuItem>
  );
}
