import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import CustomRouterLink from 'components/CustomRouterLink';

import { authUpdateCart } from 'actions/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    borderBottom: '2px solid ' + theme.palette.background.default
  },
  media: {
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		width: 100,
		height: 100,
	},
	title: {
		textAlign: 'left',
		color: theme.palette.text.primary,
		display: '-webkit-box',
		boxOrient: 'vertical',
		lineClamp: 2,
		wordBreak: 'break-all',
		overflow: 'hidden',
	},
	subtitle: {
		marginTop: theme.spacing(1),
		fontSize: 12,
		textAlign: 'left',
		color: theme.palette.text.secondary,
		display: '-webkit-box',
		boxOrient: 'vertical',
		wordBreak: 'break-all',
		overflow: 'hidden',
		[theme.breakpoints.up('xs')]: {
			lineClamp: 2,
		},
		[theme.breakpoints.up('md')]: {
			lineClamp: 3,
		}
	},
	price: {
		fontWeight: 500,
		marginTop: theme.spacing(2)
	},
	infoCountContainer: {
		width: '100%',
		margin: 'auto'
	}
}));

export default function ComplexGrid(props) {
	const { product, status } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const removeFromCart = (e, id) => {
  	e.stopPropagation();
  	e.preventDefault();
  	dispatch(authUpdateCart(user.id, id));
  }

  return (
    <Box component={CustomRouterLink} to={"/product/" + product._id}>
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
          	<div 
          		className={classes.media}
          		style={{
          			backgroundImage: `url(${product.thumbnail})`,
          		}}
          	>
          	</div>
          </Grid>
          <Grid item xs container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography 
                	style={{
                		color: status === 'pending' ? 'orange' : 'green'}}>
                	{status === 'pending' ? "Pendiente" : "Entregado"}
                </Typography>
								<Box component="div" classes={{ root: classes.subtitle }}>
					        <div className={classes.infoCountContainer}>
					        	<Typography color="textSecondary">{product.name}</Typography>
					        	<Typography 
					        		color="textSecondary"
					        	>
					        		{product.count}
					        		{" "}
					        		{product.count > 1 ? "Unidades" : "Unidad"}
					        	</Typography>
					        	<Typography color="textSecondary">Price: {product.price}</Typography>
					        </div>
								</Box>
                <Typography className={classes.price} display="block" gutterBottom>
									Total: $ {product.price * product.count}
								</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}