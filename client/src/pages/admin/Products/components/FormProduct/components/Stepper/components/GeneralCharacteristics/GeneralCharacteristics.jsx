import React from 'react';
import { useSelector } from 'react-redux';
import {
	Formik,
	Form,
	FastField,
} from 'formik';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { HandleFormProductButton } from 'components';

import { validateGeneralCharacteristics } from 'helpers/validateProduct';

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
	marginTop: {
		marginTop: theme.spacing(2),
	},
	error: {
		marginTop: theme.spacing(2),
	},
	errorText: {
		display: 'block'
	}
}));


export default function FormProduct() {
	const classes = useStyles();
	const { product } = useSelector(state => state.products.productForm);

	let initialValues;

	if (!product.caracteristias_generales) {
		initialValues = {
			marca: '',
			línea: '',
			modelo: '',
			color: '',
			origen: '',
			versión: '',
			modelo_detallado: ''
		}
	} else {
		initialValues = {
			marca: product.caracteristias_generales.marca,
			línea: product.caracteristias_generales.línea,
			modelo: product.caracteristias_generales.modelo,
			color: product.caracteristias_generales.color,
			origen: product.caracteristias_generales.origen,
			versión: product.caracteristias_generales.versión,
			modelo_detallado: product.caracteristias_generales.modelo_detallado,
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
							let result = validateGeneralCharacteristics(values)
							//return result;
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="marca">
										{({ field }) => (
											<TextField
												label="Marca"
												placeholder="Ej Samsung"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="línea">
										{({ field }) => (
											<TextField
												label="Línea"
												placeholder="Ej Galaxy A"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="modelo">
										{({ field }) => (
											<TextField
												label="Modelo"
												placeholder="Ej A32"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="color">
										{({ field }) => (
											<TextField
												label="Color"
												placeholder="Ej Awesome blue"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="origen">
										{({ field }) => (
											<TextField
												label="Origen"
												placeholder="Ej Argentina"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="modelo_detallado">
										{({ field }) => (
											<TextField
												label="Modelo Detallado"
												placeholder="Ej IPROV1000406620255"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
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
										sectionName={"caracteristias_generales"}
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
