import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';

import SlideProducts from 'components/SlideProducts';
import Product from 'components/SlideProducts/Product';
import { CustomRouterLink } from 'components';
import { fetchWithoutToken } from 'helpers/fetch';
import { productsLoadProductsSections } from 'actions/products';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(4),
	},
	title: {
		marginTop: theme.spacing(2),
	},
	productsSection: {
		paddingTop: theme.spacing(1),
		marginBottom: theme.spacing(3),
	},
}));

export default function Products(props) {
	const { productsSections } = useSelector((state) => state.products);
	const {
		uiAllProductsSections: { isLoading, error, success },
	} = useSelector((state) => state.ui);
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(async () => {
		if (productsSections.length === 0) {
			dispatch(productsLoadProductsSections());
		}
	}, []);

	return (
		<div className={classes.root}>
			<div>
				<Button
					color="primary"
					variant="contained"
					size="medium"
					className={classes.addProductButton}
					component={CustomRouterLink}
					to="/admin/integration/products/create-section"
				>
					Crear Sección
				</Button>
				<div className={classes.title}>
					<Typography variant="h2" gutterBottom>
						Todas las secciones
					</Typography>
				</div>
				{isLoading ? (
					<Typography variant="h4">Cargando secciones...</Typography>
				) : error ? (
					<Alert severity="error">
						<AlertTitle>Error</AlertTitle>
						<strong>{error} </strong>
					</Alert>
				) : productsSections.length === 0 ? (
					<Typography variant="h4">No tienes ninguna sección.</Typography>
				) : (
					<div className={classes.allProductsSection}>
						{productsSections.map((productsSection) => {
							return (
								<div
									className={classes.productsSection}
									key={productsSection.id}
								>
									<Typography variant="h3" gutterBottom>
										{productsSection.name}
									</Typography>
									<SlideProducts>
										{productsSection.Products.map((product) => {
											return <Product key={product.id} product={product} />;
										})}
									</SlideProducts>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
