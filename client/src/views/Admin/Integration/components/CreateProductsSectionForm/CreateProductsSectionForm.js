import React, { useState } from 'react';
import {
	Formik,
	Form,
	FastField,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';

import { productAddProductsSection } from 'actions/products';
import { fetchWithoutToken } from 'helpers/fetch';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: 'white',
		padding: theme.spacing(2),
		borderRadius: 20,
		marginTop: theme.spacing(2),
	},
	form: {
		margin: theme.spacing(1),
		width: '100%',
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	marginTop: {
		marginTop: theme.spacing(2),
	},
	textField: {
		width: '25ch',
	},
	textFieldSmall: {
		width: '30%',
	},
}));

export default function FormProduct(props) {

	const history = useHistory();
	const { setProducts, products } = props;
	const dispatch = useDispatch();
	const {
		uiCreateProduct: { isLoading },
	} = useSelector((state) => state.ui);
	const classes = useStyles();
	const [sectionProducts, setSectionProducts] = useState({
		isLoading: false,
		error: null,
		success: null,
	});

	const addProduct = async (id) => {
		if (products.some((product) => product._id === id)) {
			return setSectionProducts({
				isLoading: false,
				error: `El producto con el id ${id} ya se encuentra en la seccion`,
				succes: null,
			});
		}
		setSectionProducts((prev) => {
			return {
				...prev,
				isLoading: true,
			};
		});
		const result = await fetchWithoutToken(`products/${id}`, 'GET');
		if (!result.error) {
			setProducts((prev) => prev.concat([result.data.product]));
			setSectionProducts({
				isLoading: false,
				error: null,
				success: true,
			});
		} else {
			setSectionProducts({
				isLoading: false,
				error: result.error,
				success: false,
			});
		}
	};

	return (
		<div>
			<Grid container>
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<Formik
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={{
							name: '',
							_id: '',
						}}
						validate={(values) => {
							let errors = {};
							if(values.name.length < 4) {
								errors.name = 'El nombre debe contener al menos 4 caracteres';
							} else if(products.length < 4 || products.length > 12) {
								errors._id = 'La sección debe tener entre 4 y 12 productos';
							}
							return errors;
						}}
						onSubmit={(values) => {
							const productsId = products.map(product => product._id);
							dispatch(productAddProductsSection({
								name: values.name,
								order: 10,
								products: productsId
							}, history, productsId));
						}}
					>
					{(formikProps) => (
						<Form className={classes.form}>
							<FormControl fullWidth variant="outlined">
								<FastField name="name">
									{({ field }) => (
										<TextField
											label="Nombre de la Sección"
											variant="outlined"
											{...field}
										/>
									)}
								</FastField>
							</FormControl>
							<Grid
								container
								spacing={2}
								alignItems="center"
								className={clsx(classes.marginTop)}
							>
								<Grid item xs={12} sm={4}>
									<FastField name="_id">
										{({ field }) => (
											<TextField
												fullWidth
												label="ID del producto"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</Grid>
							</Grid>
							<div className={clsx(classes.marginTop)}>
								<Button
									color="primary"
									variant="contained"
									disabled={sectionProducts.isLoading ? true : false}
									onClick={() => addProduct(formikProps.values._id)}
								>
									Agregar Producto
								</Button>
							</div>
							{sectionProducts.error ? (
								<Grid container className={clsx(classes.marginTop)}>
									<Alert severity="error">
										<AlertTitle>Error</AlertTitle>
										<strong>{sectionProducts.error}</strong>
									</Alert>
								</Grid>
							) : null}
							{sectionProducts.success ? (
								<Grid container className={clsx(classes.marginTop)}>
									<Alert severity="success">
										<AlertTitle>Correcto</AlertTitle>
										<strong>Se agrego el producto correctamente</strong>
									</Alert>
								</Grid>
							) : null}
							<Grid container className={clsx(classes.marginTop)}>
								{Object.values(formikProps.errors).map((msg) => (
									<Typography variant="body1" color="error" key={msg}>
										{msg}
									</Typography>
								))}
							</Grid>
							<div className={clsx(classes.marginTop)}>
								{isLoading ? (
									<CircularProgress />
								) : (
									<Button 
									color="primary" 
									variant="contained" 
									type="submit"
									>
										Crear Sección
									</Button>
								)}
							</div>
						</Form>
					)}
					</Formik>
				</Grid>
			</Grid>
		</div>
	);
}
