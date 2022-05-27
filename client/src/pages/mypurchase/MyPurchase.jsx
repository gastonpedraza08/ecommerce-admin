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
}));

export default function MyPurchase() {
	const classes = useStyles();
	const { user } = useSelector(state => state.auth);
	const [pendingProducts, setPendingProducts] = useState([]);

	useEffect(() => {
		if (user) {
			(async () => {
				setPendingProducts(user.info.pendingShipments)
			})();
		}
	}, [user]);

	console.log(pendingProducts)

	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<div className={classes.form}>
						{
							pendingProducts.map(product => {
								return (
									<Product key={product._id} product={product} />
								)
							})
						}
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
