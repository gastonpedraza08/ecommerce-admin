import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";

import SlideProducts from 'components/SlideProducts';
import Product from 'components/SlideProducts/Product';
import CreateProductsSectionForm from '../components/CreateProductsSectionForm';
import ModalOrderProducts from '../components/CreateProductsSectionForm/ModalOrderProducts';

import { fetchWithoutToken } from 'helpers/fetch';

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
	productContainer: {
		position: 'relative',
		'&:hover': {
			'& > button': {
				backgroundColor: 'white'
			}
		}
	},
	iconDeleteProduct: {
		position: 'absolute',
		right: 20
	}
}));

export default function CreateProductsSection(props) {
	const classes = useStyles();
	const [products, setProducts] = useState([]);
	const [info, setInfo] = useState({
		name: '',
		_id: '',
		update: false
	});
	const { id } = useParams();

	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		if (id) {
			(async () => {
				try {
					const result = await fetchWithoutToken('products-section/' + id, {}, 'GET');
					if (!result.error) {
						setProducts(result.data.productsSection.products)
						setInfo({
							name: result.data.productsSection.name,
							_id: result.data.productsSection._id,
							order: result.data.productsSection.order,
							update: true,
						});
					} else {
						console.log(result.error)
					}
				} catch (error) {
					console.log(error)
				}
			})();
		}
	}, [id]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const deleteProduct = id => {
		setProducts(prev => {
			return prev.filter(p => p._id !== id)
		});
	}

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Typography variant="h3">Crear Sección de Productos</Typography>
			</div>
			<div className={classes.formSection}>
				<CreateProductsSectionForm
					setProducts={setProducts}
					products={products}
					info={info}
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
							return (
								<div className={classes.productContainer}>
									<Tooltip title="Eliminar Producto" placement="bottom">
										<IconButton className={classes.iconDeleteProduct} onClick={() => deleteProduct(product._id)}>
				              <DeleteIcon />
				            </IconButton>
									</Tooltip>
									<Product key={product._id} product={product} />
								</div>
							)
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
