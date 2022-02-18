import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CustomRouterLink from 'components/CustomRouterLink';

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

	return (
		<Card className={classes.root} component={CustomRouterLink} to={`product/${product._id}`} >
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
				<IconButton>
					<ShoppingCartIcon />
				</IconButton>
			</div>
		</Card>
	);
}
