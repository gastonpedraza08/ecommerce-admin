import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { fetchWithoutToken } from 'helpers/fetch';

import { Product, Dialog } from './components';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: 'white',
		padding: theme.spacing(2),
		borderRadius: 20,
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(5)
	},
	form: {
		margin: theme.spacing(1),
		width: '100%',
	},
	buyButtonContainer: {
		display: 'flex',
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoContainer: {
		display: 'flex',
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	}
}));

export default function MyCart() {
	const classes = useStyles();
	const history = useHistory();
	const { user } = useSelector(state => state.auth);
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (user) {
			(async () => {
				const result = await fetchWithoutToken("users/mycart/" + user.id, {}, "GET");
		    if (!result.error) {
		    	setProducts(result.data.products);
		    	let description = '';
		    	for (let i = 0; i < result.data.products.length; i++) {
		    		description += result.data.products[i].count + 'x ' + result.data.products[i].name + '. ';
		    	}
		    	localStorage.setItem('descriptionCart', description);
		    	localStorage.setItem('customerId', user.id);
		    	localStorage.setItem('products', JSON.stringify(result.data.products));
		    } else {
		    	console.log(result.error)
		    }
			})();
		}
	}, [user]);

	useEffect(() => {
		let totalTmp = 0;
		for (let i = 0; i < products.length; i++) {
			totalTmp += Number(products[i].count) * Number(products[i].price)
		}
		setTotal(totalTmp);
		localStorage.setItem('totalCart', totalTmp);
	}, [products]);

	const buyCart = () => {
		console.log(history)
	}

	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<div className={classes.form}>
						<>
							{
								products.map(product => {
									return (
										<Product product={product} key={product._id} />
									);
								})
							}
						</>
						<>
							{
								user ?
								(
									<>
										<div className={classes.infoContainer}>
											<Typography variant="h3">
												Total ${total}
											</Typography>
										</div>
										<div className={classes.buyButtonContainer}>
											<Dialog />
										</div>
									</>
								)
								:
								(
									<div style={{height: 85}}>
										<Typography variant="h2">
											Opps... Carrito Vacío
										</Typography>						
									</div>
								)
							}
						</>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
