import React, { useState } from 'react';
import {
	Formik,
	Form,
	FastField,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';

import UploadAlbum from '../UploadAlbum';
import DescriptionEditor from './CKEditor';

import { validateFormProduct } from 'helpers/validateForms';
import { productCreateProduct } from 'actions/products';

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
}));

export default function FormProduct() {
	const dispatch = useDispatch();
	const [isTouched, setIsTouched] = useState(false);
	const {
		uiCreateProduct: { isLoading, error, success },
	} = useSelector((state) => state.ui);
	const classes = useStyles();
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState('');
	const [thumbnail, setThumbnail] = useState('');

	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<Formik
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={{
							name: '',
							sku: '',
							category: '',
							price: '',
							state: 'active',
							stock: '',
							thumbnail: '',
							images: '',
							description: '',
						}}
						validate={(values) =>
							validateFormProduct(values, images, thumbnail, description)
						}
						onSubmit={(values) => {
							const product = {
								...values,
								categoryId: values.category.id,
								images,
								thumbnail,
								description,
							};
							dispatch(productCreateProduct(product));
							setIsTouched(true);
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
											options={[
												{ title: 'title 1', id: 1 },
												{ title: 'title 2', id: 2 },
											]}
											getOptionLabel={(option) => option.title || ''}
											onChange={(e, value) =>
												formikProps.setFieldValue('category', value)
											}
											value={formikProps.values.category}
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
										<FastField name="state" as="select">
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
								</Grid>
								<Grid container className={clsx(classes.marginTop)}>
									<FormControl
										fullWidth
										variant="outlined"
										style={{ padding: '0 5px' }}
									>
										<DescriptionEditor
											setDescription={setDescription}
											description={description}
										/>
									</FormControl>
								</Grid>
								<Grid container className={clsx(classes.marginTop)}>
									<UploadAlbum
										images={images}
										setImages={setImages}
										setThumbnail={setThumbnail}
										thumbnail={thumbnail}
									/>
								</Grid>
								<Grid container className={clsx(classes.marginTop)}>
									{Object.values(formikProps.errors).map((msg) => (
										<Typography variant="body1" color="error" key={msg}>
											{msg}
										</Typography>
									))}
								</Grid>
								{isTouched && error ? (
									<Grid container className={clsx(classes.marginTop)}>
										<Alert severity="error" className={classes.error}>
											<AlertTitle>Error</AlertTitle>
											<strong>{error}</strong>
										</Alert>
									</Grid>
								) : null}
								{isTouched && success ? (
									<Grid container className={clsx(classes.marginTop)}>
										<Alert severity="success" className={classes.error}>
											<AlertTitle>Correcto</AlertTitle>
											<strong>El producto se ha creado con éxito!</strong>
										</Alert>
									</Grid>
								) : null}
								<div className={clsx(classes.marginTop)}>
									{isLoading ? (
										<CircularProgress />
									) : (
										<Button color="primary" variant="contained" type="submit">
											Submit
										</Button>
									)}
								</div>
							</Form>
						)}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
