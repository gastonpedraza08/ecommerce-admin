import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

import MenuIcon from "@material-ui/icons/Menu";
import StorefrontIcon from "@material-ui/icons/Storefront";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import CustomRouterLink from 'components/CustomRouterLink';
import { makeStyles } from "@material-ui/core/styles";

import { uiHandleDrawerToggle } from "actions/ui";
import { productsSearchProducts } from "actions/products";

import { SearchInput } from "components";
import AuthButton from './components/AuthButton';

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
  cartIconContainer: {
    position: 'relative',
    '& > div': {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      height: '100%',
      '& span': {
        color: 'white'
      }
    }
  }
}));

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [itemsInCart, setItemsInCart] = useState(0);

  const { isLoggedIn, user } = useSelector(state => state.auth);

  let query = useQuery();
  const searchedValue = query.get('search');

  const showAlert = () => {
    Swal.fire('Esta función está en proceso.')
  }

  useEffect(() => {
    const searchString = location.search.replace(/\s+/g, '+');
    if (location.pathname === '/results') {
      dispatch(productsSearchProducts(searchString));
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (user) {
      if (user.info) {
        if (user.info.productsInCart) {
          setItemsInCart(user.info.productsInCart.length);
        } else {
          setItemsInCart(0);
        }
      } else {
        setItemsInCart(0);
      }
    }
  }, [user]);

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
        <AuthButton />
        {
          isLoggedIn ?
          (
            <>
              <div className={classes.cartIconContainer}>
                <div>
                  <span>{itemsInCart}</span>
                </div>
                <IconButton onClick={showAlert} color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
              </div>
              <IconButton onClick={showAlert} color="inherit">
                <StorefrontIcon />
              </IconButton>
            </>
          )
          :
          (null)
        }
      </Hidden>
    </Toolbar>
  );
}


function useQuery() {
  return new URLSearchParams(useLocation().search);
}