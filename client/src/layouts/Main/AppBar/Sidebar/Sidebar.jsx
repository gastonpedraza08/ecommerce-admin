import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import StorefrontIcon from "@material-ui/icons/Storefront";

import { makeStyles } from "@material-ui/core/styles";

import ListItemMenu from "./ListItemMenu";
import { uiHandleDrawerToggle } from "actions/ui";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    width: 250,
  },
  label: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: theme.spacing(0.5),
    "& .iconText": {
      fontSize: 10,
    },
  },
}));

export default function Sidebar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { uiSidebarOpen } = useSelector((state) => state.ui);

  const toggleDrawer = () => dispatch(uiHandleDrawerToggle());

  return (
    <Drawer open={uiSidebarOpen} onClose={toggleDrawer}>
      <div className={classes.sidebar}>
        <Card>
          <CardHeader
            action={
              <IconButton size="small" color="inherit" onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            }
            title="Menu"
          />
          <Divider />
          <CardContent>
            <Button classes={{ root: classes.button, label: classes.label }}>
              <ShoppingCartIcon />
              <span className="iconText">FAVORITOS</span>
            </Button>
            <Button classes={{ root: classes.button, label: classes.label }}>
              <PermIdentityIcon />
              <span className="iconText">MI CUENTA</span>
            </Button>
            <Button classes={{ root: classes.button, label: classes.label }}>
              <StorefrontIcon />
              <span className="iconText">CARRITO</span>
            </Button>
          </CardContent>
          <Divider />
          <CardContent>
            <ListItemLink>Inicio</ListItemLink>
            <ListItemLink>Segu?? tu Pedido</ListItemLink>
          </CardContent>
          <Divider />
          <CardContent>
            <List>
              <ListItemMenu label="Celulares y Tel??fonos">
                <ListItemLink href="/some">
                  Celulares y Smartphones
                </ListItemLink>
                <ListItemLink href="/some">
                  Accesorios para Celulares
                </ListItemLink>
              </ListItemMenu>
              <ListItemMenu label="C??maras y Accesorios">
                <ListItemLink>C??maras Digitales</ListItemLink>
                <ListItemLink>Accesorios para C??maras</ListItemLink>
              </ListItemMenu>
              <ListItemMenu label="Consolas y Videojuegos">
                <ListItemLink>Videojuegos</ListItemLink>
                <ListItemMenu label="Para PlayStation">
                  <ListItemLink>Gamepads y Joystick</ListItemLink>
                  <ListItemLink>Consolas y Accesorios</ListItemLink>
                </ListItemMenu>
              </ListItemMenu>
              <ListItemMenu label="Computaci??n">
                <ListItemLink>Componentes de PC</ListItemLink>
                <ListItemLink>Impresi??n</ListItemLink>
                <ListItemLink>Tablets y Accesorios</ListItemLink>
                <ListItemLink>PC</ListItemLink>
              </ListItemMenu>
              <ListItemMenu label="Electr??nica, Audio y Video">
                <ListItemLink>Audio</ListItemLink>
                <ListItemLink>Accesorios para Audio y Video</ListItemLink>
                <ListItemLink>Componentes Electr??nicos</ListItemLink>
                <ListItemLink>Drones y Accesorios</ListItemLink>
              </ListItemMenu>
            </List>
          </CardContent>
        </Card>
      </div>
    </Drawer>
  );
}

function ListItemLink(props) {
  return (
    <ListItem {...props} button component="a">
      {props.children}
    </ListItem>
  );
}
