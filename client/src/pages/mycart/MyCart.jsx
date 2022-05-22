import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { fetchWithoutToken } from 'helpers/fetch';

import { Product } from './components';

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

export default function FormProduct() {
	const classes = useStyles();
	const { id } = useParams();
	const history = useHistory();
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		(async () => {
			const result = await fetchWithoutToken("users/mycart/" + id, {}, "GET");
	    if (!result.error) {
	    	setProducts(result.data.products);
	    } else {
	    	console.log(result.error)
	    }
		})()
	}, [id]);

	useEffect(() => {
		let totalTmp = 0;
		for (let i = 0; i < products.length; i++) {
			totalTmp += Number(products[i].count) * Number(products[i].price)
		}
		setTotal(totalTmp);
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
						<div className={classes.infoContainer}>
							<Typography variant="h3">
								Total ${total}
							</Typography>
						</div>
						<div className={classes.buyButtonContainer}>
							<Button 
								color="primary" 
								variant="outlined"
								onClick={() => buyCart()}
							>Comprar Carrito</Button>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
