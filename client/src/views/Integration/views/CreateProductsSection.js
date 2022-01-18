import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import SlideProducts from 'components/SlideProducts';
import Product from 'components/SlideProducts/Product';
import CreateProductsSectionForm from '../components/CreateProductsSectionForm';
import ModalOrderProducts from '../components/CreateProductsSectionForm/ModalOrderProducts';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(4),
	},
	title: {
		marginBottom: theme.spacing(3),
	},
	slideSection: {
		marginTop: theme.spacing(3),
	},
	formSection: {
		marginBottom: theme.spacing(3),
	},
}));

export default function CreateProductsSection(props) {
	const classes = useStyles();
	const [products, setProducts] = useState([]);

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Typography variant="h3">Crear Sección de Productos</Typography>
			</div>
			<div className={classes.formSection}>
				<CreateProductsSectionForm
					setProducts={setProducts}
					products={products}
				/>
			</div>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				className={classes.actions}
			>
				<Typography variant="h2">Vista Previa</Typography>
				<Button
					onClick={handleOpen}
					color="primary"
					variant="contained"
					size="medium"
					disabled={products.length > 0 ? false : true}
				>
					Editar Orden
				</Button>
				<ModalOrderProducts
					handleClose={handleClose}
					open={open}
					products={products}
					setProducts={setProducts}
					setOpen={setOpen}
				/>
			</Box>
			<div className={classes.slideSection}>
				{products.length > 0 ? (
					<SlideProducts>
						{products.map((product) => {
							return <Product key={product.id} product={product} />;
						})}
					</SlideProducts>
				) : (
					<Typography variant="h4">
						Sección vacia. Agrega más productos
					</Typography>
				)}
			</div>
		</div>
	);
}
