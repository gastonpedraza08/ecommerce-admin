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

import { validateBattery } from 'helpers/validateProduct';

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

	if (!product.bateria) {
		initialValues = {
			capacidad_de_la_batería: '',
			tipo_de_batería: '',
			con_carga_rápida: '',
			con_carga_inalámbrica: '',
			con_batería_removible: '',
			tiempo_de_conversación: '',
			duración_de_la_batería_en_espera: '',
		}
	} else {
		initialValues = {
			capacidad_de_la_batería: product.bateria.capacidad_de_la_batería,
			tipo_de_batería: product.bateria.tipo_de_batería,
			con_carga_rápida: product.bateria.con_carga_rápida,
			con_carga_inalámbrica: product.bateria.con_carga_inalámbrica,
			con_batería_removible: product.bateria.con_batería_removible,
			tiempo_de_conversación: product.bateria.tiempo_de_conversación,
			duración_de_la_batería_en_espera: product.bateria.duración_de_la_batería_en_espera,
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
							let result = validateBattery(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="capacidad_de_la_batería">
										{({ field }) => (
											<TextField
												label="Capacidad de la batería (mAh)"
												placeholder="Ej 4500"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tipo_de_batería">
										{({ field }) => (
											<TextField
												label="Tipo de batería"
												placeholder="Ej Polímero de litio"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_carga_rápida">
										{({ field }) => (
											<TextField
												label="Con carga rápida"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_carga_inalámbrica">
										{({ field }) => (
											<TextField
												label="Con carga inalámbrica"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_batería_removible">
										{({ field }) => (
											<TextField
												label="Con batería removible"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tiempo_de_conversación">
										{({ field }) => (
											<TextField
												label="Tiempo de conversación (Hs)"
												placeholder="Ej 26"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="duración_de_la_batería_en_espera">
										{({ field }) => (
											<TextField
												label="Duración de la batería en espera"
												placeholder="Ej 125 h"
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
										sectionName={"bateria"}
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
