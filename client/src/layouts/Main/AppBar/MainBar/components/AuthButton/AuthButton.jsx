import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import IconButton from "@material-ui/core/IconButton";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import { authLogout } from 'actions/auth';

import { CustomRouterLink } from 'components';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 20
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  loginButton: {
    margin: '0 10px'
  }
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector(state => state.auth);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = event =>  {
    dispatch(authLogout());
    setOpen(false);
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <>
      {
        isLoggedIn ?
        (
          <div className={classes.root}>
            <div>
              <IconButton 
                color="inherit"
                ref={anchorRef}
                onClick={handleToggle}
              >
                <PermIdentityIcon />
              </IconButton>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={handleClose} component={CustomRouterLink} to="/mypurchase">Mis compras</MenuItem>
                          <MenuItem onClick={handleLogout}>
                            Cerrar Sesión
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>
        )
        :
        (
          <div className={classes.loginButton}>
            <Link to="/auth/login" color="inherit" component={CustomRouterLink}>
              <Typography color="inherit" variant="body1">
                Inicar Sesión
              </Typography>
            </Link>
          </div>
        )
      }
    </>
  );
}
