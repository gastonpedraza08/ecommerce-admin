import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Formik,
	Form,
	FastField,
} from 'formik';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { UploadAlbum, HandleFormProductButton } from 'components';
import DescriptionEditor from './CKEditor.jsx';

import { validateBasicInfo } from 'helpers/validateProduct';
import objCategories from 'assets/config/products/categories';

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

let categories = [];

let defaultCategory = {
	id: 0,
	title: 'Selecciona una categoria',
	disabled: true
};

categories.push(defaultCategory);

for (let prop in objCategories) {
	categories.push({
		id: Number(prop),
		title: objCategories[prop],
		disabled: Number(prop) !== 1 ? true : false
	});
}


export default function FormProduct() {
	const classes = useStyles();
	const { product } = useSelector(state => state.products.productForm);

	const [images, setImages] = useState(product.basic_info.images || []);
	const [thumbnail, setThumbnail] = useState(product.basic_info.thumbnail || '');
	const [category, setCategory] = useState(() => {
		if (product.basic_info.categoryId) {
			let categoryInList = categories.find(categ => categ.id === product.basic_info.categoryId);
			return categoryInList;
		} else {
			return defaultCategory;
		}
	});

	let initialValues;

	if (!product.basic_info) {
		initialValues = {
			name: '',
			sku: '',
			categoryId: product.basic_info.categoryId || '',
			price: '',
			state: '',
			condition: '',
			stock: '',
			thumbnail: product.basic_info.thumbnail || '',
			images: product.basic_info.images || [],
			description: '',
		}
	} else {
		initialValues = {
			name: product.basic_info.name,
			sku: product.basic_info.sku,
			categoryId: product.basic_info.categoryId,
			price: product.basic_info.price,
			state: product.basic_info.state,
			condition: product.basic_info.condition,
			stock: product.basic_info.stock,
			thumbnail: product.basic_info.thumbnail,
			images: product.basic_info.images,
			description: product.basic_info.description,
		}
	}

	const limitImages = 12;


	const setImagesFn = (payload, type, setFieldValue) => {
		if (type === 'add') {
			setImages((prev) => {
				let fullArr = prev.concat(payload);
				if (fullArr.length > limitImages) {
					fullArr = fullArr.slice(-limitImages);
				}
				setFieldValue('images', fullArr);
				return fullArr;
			});
		} else if (type === 'delete') {
			setImages(prev => {
				let fullArr = prev.filter(image => image.url!==payload);
				setFieldValue('images', fullArr);
				return fullArr;
			});
		}
	}

	const setThumbnailFn = (payload, type, setFieldValue) => {
		if (type === 'add') {
			setFieldValue('thumbnail', payload[0].url);
			setThumbnail(payload[0].url);
		} else if (type === 'delete') {
			setFieldValue('thumbnail', '');
			setThumbnail('');
		}
	}

	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<Formik
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={initialValues}
						validate={(values) => {
							let result = validateBasicInfo(values)
							return result
						}}
					>
						{(formikProps) => (
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
									<Grid item xs={12} sm={4}>
										<FastField name="sku">
											{({ field }) => (
												<TextField
													fullWidth
													label="Sku"
													variant="outlined"
													{...field}
												/>
											)}
										</FastField>
									</Grid>
									<Grid item>
										<Button
											color="primary"
											variant="contained"
											size="medium"
											onClick={() => formikProps.setFieldValue('sku', uuidv4())}
										>
											Generar sku
										</Button>
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
											getOptionDisabled={(option) => option.disabled}
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
									<Grid item xs={12} sm={6} md={4}>
										<FastField name="state">
											{({ field }) => (
												<TextField
													style={{ width: '100%' }}
													select
													{...field}
													label="Estado"
													variant="outlined"
													SelectProps={{
														native: true,
													}}
												>
													<option value="active">Activo</option>
													<option value="disabled">Inactivo</option>
													<option value="pause">Pausado</option>
												</TextField>
											)}
										</FastField>
									</Grid>
									<Grid item xs={12} sm={6} md={4}>
										<FastField name="condition">
											{({ field }) => (
												<TextField
													style={{ width: '100%' }}
													select
													{...field}
													label="Condici??n"
													variant="outlined"
													SelectProps={{
														native: true,
													}}
												>
													<option value="new">Nuevo</option>
													<option value="used">Usado</option>
													<option value="reconditioned">Reacondicionado</option>
												</TextField>
											)}
										</FastField>
									</Grid>
								</Grid>
								<Grid container className={clsx(classes.marginTop)}>
									<FormControl
										fullWidth
										variant="outlined"
										style={{ padding: '0 5px' }}
									>
										<DescriptionEditor
											setFieldValue={formikProps.setFieldValue}
											description={formikProps.values.description}
										/>
									</FormControl>
								</Grid>
								<Grid container className={clsx(classes.marginTop)}>
									<Typography variant="subtitle1"  gutterBottom>
										Im??genes del Producto
									</Typography>
									<UploadAlbum
										images={images}
										setImagesFn={(payload, type) => { 
											setImagesFn(payload, type, formikProps.setFieldValue);
										}}
										limit={limitImages}
									/>
								</Grid>
								<Grid container className={clsx(classes.marginTop)}>
									<Typography variant="subtitle1" gutterBottom>
										Thumbnail
									</Typography>
									<UploadAlbum
										images={thumbnail !== '' ? [{ name: 'thumbnail', url: thumbnail}] : []}
										setImagesFn={(payload, type) => {
											setThumbnailFn(payload, type, formikProps.setFieldValue);
										}}
										limit={1}
									/>
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
										categoryId={formikProps.values.categoryId}
										values={formikProps.values}
										sectionName={"basic_info"}
									/>
								</div>
							</Form>
						)}
					</Formik>
				</Grid>
			</Grid>
		</div>
	);
}
