import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CustomRouterLink from 'components/CustomRouterLink';

import { authUpdateMe } from 'actions/auth';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 300, //345
		maxHeight: 450,
		marginRight: 20,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	media: {
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		width: 'auto',
		height: '200px',
	},
	promotion: {
		marginTop: theme.spacing(1),
		textAlign: 'left',
		color: theme.palette.text.secondary,
	},
	actions: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 'auto',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	cardContent: {
		paddingBottom: '0px!important',
		flex: '1 0 auto',
	},
	price: {
		fontWeight: 500,
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
		lineClamp: 4,
		wordBreak: 'break-all',
		overflow: 'hidden',
	},
}));

export default function Product(props) {
	const classes = useStyles();
	const { product } = props;

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

	return (
		<Card className={classes.root} component={CustomRouterLink} to={`/product/${product._id}`} >
			<div 
			className={classes.media}
			style={{
				backgroundImage: `url(${product.thumbnail})`,
			}}
			></div>
			<CardContent className={classes.cardContent}>
				<Box
					fontSize="h5.fontSize"
					component="div"
					classes={{ root: classes.title }}
				>
					{product.name}
				</Box>
				<Box component="div" classes={{ root: classes.subtitle }}>
					<div dangerouslySetInnerHTML={{ __html: product.description }} >
					</div>
				</Box>
			</CardContent>
			<div className={classes.actions}>
				<Typography className={classes.price} display="block" gutterBottom>
					$ {product.price}
				</Typography>
				<Tooltip title="Añadir al carrito" placement="bottom">
					<IconButton 
						onClick={(e) => addToCar(e, product._id)}
					>
						<ShoppingCartIcon />
					</IconButton>
				</Tooltip>
			</div>
		</Card>
	);
}
