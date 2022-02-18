import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Hidden from "@material-ui/core/Hidden";

import MenuIcon from "@material-ui/icons/Menu";
import StorefrontIcon from "@material-ui/icons/Storefront";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

import CustomRouterLink from 'components/CustomRouterLink';
import { makeStyles } from "@material-ui/core/styles";

import { uiHandleDrawerToggle } from "actions/ui";
import { productsSearchProducts } from "actions/products";

import { SearchInput } from "components";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    '& *': {
      color: theme.palette.primary.contrastText,
    }
  },
  toolBar: {
  	backgroundColor: theme.palette.primary.dark
  },
}));

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let query = useQuery();
  const searchedValue = query.get('search');

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showAlert = () => {
    Swal.fire('Esta función está en proceso.')
  }

  useEffect(() => {
    const searchString = location.search.replace(/\s+/g, '+');
    dispatch(productsSearchProducts(searchString));
  }, [location, dispatch]);

  return (
    <Toolbar className={classes.toolBar}>
      <Hidden mdUp>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          onClick={() => dispatch(uiHandleDrawerToggle())}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
      <Hidden smDown>
        <IconButton edge="start" component={CustomRouterLink} to="/" className={classes.menuButton} color="inherit">
          <StorefrontIcon />
        </IconButton>
      </Hidden>
      <Hidden xsDown>
        <div className={classes.title}>
          <Typography variant="h6" component={CustomRouterLink} to="/">
            MAGAZINCA
          </Typography>
        </div>
      </Hidden>
      <SearchInput
        className={classes.searchInput}
        placeholder="Buscar un producto"
        defaultValue={searchedValue ? searchedValue : ''}
        name="search"
        onSubmit={(e) => {
        	e.preventDefault();
        	const searchString = e.target.search.value.replace(/\s+/g, '+');
        	history.push(`/results?search=${searchString}`);
        }}
      />
      <div className={classes.grow} />
      <Hidden smDown>
        <IconButton onClick={showAlert} color="inherit">
          <PermIdentityIcon />
        </IconButton>
        <IconButton onClick={showAlert} color="inherit">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton onClick={showAlert} color="inherit">
          <StorefrontIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  );
}


function useQuery() {
  return new URLSearchParams(useLocation().search);
}