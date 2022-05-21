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

import { validateSimCard } from 'helpers/validateProduct';

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

	if (!product.tarjeta_sim) {
		initialValues = {
			es_dual_sim: '',
			cantidad_de_ranuras_para_tarjeta_sim: '',
			tamaños_de_tarjeta_sim_compatibles: '',
			con_esim: '',
			cantidad_de_esims: '',
		}
	} else {
		initialValues = {
			es_dual_sim: product.tarjeta_sim.es_dual_sim,
			cantidad_de_ranuras_para_tarjeta_sim: product.tarjeta_sim.cantidad_de_ranuras_para_tarjeta_sim,
			tamaños_de_tarjeta_sim_compatibles: product.tarjeta_sim.tamaños_de_tarjeta_sim_compatibles,
			con_esim: product.tarjeta_sim.con_esim,
			cantidad_de_esims: product.tarjeta_sim.cantidad_de_esims,
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
							let result = validateSimCard(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="es_dual_sim">
										{({ field }) => (
											<TextField
												label="Es Dual SIM"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="cantidad_de_ranuras_para_tarjeta_sim">
										{({ field }) => (
											<TextField
												label="Cantidad de ranuras para tarjeta SIM"
												placeholder="Ej 1"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tamaños_de_tarjeta_sim_compatibles">
										{({ field }) => (
											<TextField
												label="Tamaños de tarjeta SIM compatibles"
												placeholder="Ej Nano-SIM"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_esim">
										{({ field }) => (
											<TextField
												label="Con eSIM"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="cantidad_de_esims">
										{({ field }) => (
											<TextField
												label="Cantidad de eSIMs"
												placeholder="Ej 1"
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
										sectionName={"tarjeta_sim"}
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
