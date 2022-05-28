import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { authUpdateMe } from 'actions/auth';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    position: 'sticky',
    top: 25,
    paddingTop: 10,
    paddingBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const { _id } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const addToCar = (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    let fieldsToUpdate;

    let productsInCart = user.info.productsInCart;

    let index = productsInCart.findIndex(prod => prod._id === id);

    if (index === -1) {
      productsInCart.push({ _id: id, count: 1});
      fieldsToUpdate = {
        info: {
          ...user.info,
          productsInCart
        }
      }
    } else {
      productsInCart[index].count++;
      fieldsToUpdate = {
        info: {
          ...user.info,
          productsInCart: productsInCart
        }
      }
    }


    dispatch(authUpdateMe(fieldsToUpdate, user.id));
  }
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h3">
          Agregar al carrito
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={(e) => addToCar(e, _id)}
        >
          Agregar
        </Button>
      </CardActions>
    </Card>
  );
}
