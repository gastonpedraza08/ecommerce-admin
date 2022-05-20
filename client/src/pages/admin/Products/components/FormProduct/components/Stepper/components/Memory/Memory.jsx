import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Formik,
	Form,
	FastField,
} from 'formik';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { HandleFormProductButton } from 'components';

import { validateMemory } from 'helpers/validateProduct';

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

	const [initialValues, setInitialValues] = useState(() => {
		if (!product.mes_de_lanzamiento) {
			return {
				memoria_interna: '',
				memoria_ram: '',
				con_ranura_para_tarjeta_de_memoria: '',
				tipos_de_tarjeta_de_memoria: '',
				capacidad_máxima_de_la_tarjeta_de_memoria: '',
			}
		} else {
			return {
				memoria_interna: product.memoria_interna,
				memoria_ram: product.memoria_ram,
				con_ranura_para_tarjeta_de_memoria: product.con_ranura_para_tarjeta_de_memoria,
				tipos_de_tarjeta_de_memoria: product.tipos_de_tarjeta_de_memoria,
				capacidad_máxima_de_la_tarjeta_de_memoria: product.capacidad_máxima_de_la_tarjeta_de_memoria,
			}
		}
	});

	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<Formik
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={initialValues}
						validate={(values) => {
							let result = validateMemory(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="memoria_interna">
										{({ field }) => (
											<TextField
												label="Memoria interna (GB)"
												placeholder="Ej 32"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="memoria_ram">
										{({ field }) => (
											<TextField
												label="Memoria RAM (GB)"
												placeholder="Ej 4"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_ranura_para_tarjeta_de_memoria">
										{({ field }) => (
											<TextField
												label="Con ranura para tarjeta de memoria"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tipos_de_tarjeta_de_memoria">
										{({ field }) => (
											<TextField
												label="Tipos de tarjeta de memoria"
												placeholder="Ej MicroSD"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="capacidad_máxima_de_la_tarjeta_de_memoria">
										{({ field }) => (
											<TextField
												label="Capacidad máxima de la tarjeta de memoria (TB)"
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
