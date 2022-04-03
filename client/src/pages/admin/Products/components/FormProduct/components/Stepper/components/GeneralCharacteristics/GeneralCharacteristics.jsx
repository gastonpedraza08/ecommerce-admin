import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
	Formik,
	Form,
	FastField,
} from 'formik';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { HandleFormProductButton } from 'components';

import { validateFormProduct } from 'helpers/validateForms';

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
	error: {
		marginTop: theme.spacing(2),
	},
	errorText: {
		display: 'block'
	}
}));

let categories = [
	{
		title: 'title 1',
		id: 1
	},
	{
		title: 'title 2',
		id: 2
	},
]

export default function GeneralCharacteristics() {
	const classes = useStyles();
	const [category, setCategory] = useState('');
	const { product } = useSelector(state => state.products.productForm);


	const [initialValues, setInitialValues] = useState({name: '',
					categoryId: '',
					price: '',
					stock: '',});

	useEffect(() => {
		setInitialValues(() => {
			if (product.name) {
				setCategory(() => {
					return categories.find(categ => categ.id === product.categoryId);
				});
			}	
				console.log("entra aca")
				return {
					name: product.name,
					categoryId: product.categoryId,
					price: product.price,
					stock: product.stock,
				}
		});
	}, [product, setCategory]);


	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<Formik
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={initialValues}
						validate={(values) =>	{
							//let result = validateFormProduct(values);
							return {};
						}}
						render={(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined">
									<FastField name="name">
										{({ field }) => (
											<TextField
												label="Nombre del Producto"
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
										<FastField name="stock">
											{({ field }) => (
												<TextField
													label="Stock"
													variant="outlined"
													fullWidth
													{...field}
												/>
											)}
										</FastField>
									</Grid>
								</Grid>
								<Grid container spacing={2} className={clsx(classes.marginTop)}>
									<Grid item xs={12} sm={6} md={4}>
										<FastField name="price">
											{({ field }) => (
												<TextField
													label="Precio"
													variant="outlined"
													InputProps={{
														startAdornment: (
															<InputAdornment position="start">
																$
															</InputAdornment>
														),
													}}
													{...field}
													fullWidth
												/>
											)}
										</FastField>
									</Grid>
									<Grid item xs={12} sm={6} md={4}>
										<Autocomplete
											options={categories}
											getOptionLabel={(option) => option.title || ''}
											onChange={(e, value) => {
													setCategory(value);
													formikProps.setFieldValue('categoryId', value ? value.id : '');
												}
											}
											value={category}
											name="category"
											renderInput={(params) => (
												<TextField
													{...params}
													label="Categoria"
													variant="outlined"
												/>
											)}
										/>
									</Grid>
								</Grid>
								<Grid container className={clsx(classes.marginTop)}>
									{Object.values(formikProps.errors).map((msg) => (
										<Grid item xs={12} key={msg} >
											<Typography className={classes.errorText} variant="body1" color="error" >
												{msg}
											</Typography>
										</Grid>
									))}
								</Grid>
								<div className={clsx(classes.marginTop)}>
									<HandleFormProductButton 
										validateForm={formikProps.validateForm} 
										values={formikProps.values}
									/>
								</div>
							</Form>
						)}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
