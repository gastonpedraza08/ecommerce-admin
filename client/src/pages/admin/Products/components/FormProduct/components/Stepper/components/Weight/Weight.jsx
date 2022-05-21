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

import { validateWeight } from 'helpers/validateProduct';

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

	if (!product.peso_y_dimensiones) {
		initialValues = {
			peso: '',
			altura_x_ancho_x_profundidad: '',
			altura_cerrado: '',
			ancho_cerrado: '',
			profundidad_cerrado: '',
			altura_x_ancho: '',
			profundidad: '',
			ancho: '',
			altura: '',
		}
	} else {
		initialValues = {
			peso: product.peso_y_dimensiones.peso,
			altura_x_ancho_x_profundidad: product.peso_y_dimensiones.altura_x_ancho_x_profundidad,
			altura_cerrado: product.peso_y_dimensiones.altura_cerrado,
			ancho_cerrado: product.peso_y_dimensiones.ancho_cerrado,
			profundidad_cerrado: product.peso_y_dimensiones.profundidad_cerrado,
			altura_x_ancho: product.peso_y_dimensiones.altura_x_ancho,
			profundidad: product.peso_y_dimensiones.profundidad,
			ancho: product.peso_y_dimensiones.ancho,
			altura: product.peso_y_dimensiones.altura,
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
							let result = validateWeight(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="peso">
										{({ field }) => (
											<TextField
												label="Peso"
												placeholder="Ej 180 g"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="altura_x_ancho_x_profundidad">
										{({ field }) => (
											<TextField
												label="Altura x Ancho x Profundidad"
												placeholder="Ej 158.9 mm x 73.6 mm x 8.4 mm"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="altura_cerrado">
										{({ field }) => (
											<TextField
												label="Altura cerrado"
												placeholder="Ej 158.2 mm"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="ancho_cerrado">
										{({ field }) => (
											<TextField
												label="Ancho cerrado"
												placeholder="Ej 72.2 mm"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="profundidad_cerrado">
										{({ field }) => (
											<TextField
												label="Profundidad cerrado"
												placeholder="Ej 17.1 mm"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="altura_x_ancho">
										{({ field }) => (
											<TextField
												label="Altura x Ancho"
												placeholder="Ej 13 cm x 5.5 cm"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="profundidad">
										{({ field }) => (
											<TextField
												label="Profundidad"
												placeholder="Ej 13.1 mm"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="ancho">
										{({ field }) => (
											<TextField
												label="Ancho"
												placeholder="Ej 52 mm"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="altura">
										{({ field }) => (
											<TextField
												label="Altura"
												placeholder="Ej 79.2 mm"
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
										sectionName={"peso_y_dimensiones"}
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
