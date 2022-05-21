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

import { validateProcessor } from 'helpers/validateProduct';

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

	if (!product.procesador) {
		initialValues = {
			modelo_del_procesador: '',
			modelos_de_cpu: '',
			cantidad_de_núcleos_del_procesador: '',
			velocidad_del_procesador: '',
			modelo_de_gpu: '',
			velocidad_del_gpu: '',
		}
	} else {
		initialValues = {
			modelo_del_procesador: product.procesador.modelo_del_procesador,
			modelos_de_cpu: product.procesador.modelos_de_cpu,
			cantidad_de_núcleos_del_procesador: product.procesador.cantidad_de_núcleos_del_procesador,
			velocidad_del_procesador: product.procesador.velocidad_del_procesador,
			modelo_de_gpu: product.procesador.modelo_de_gpu,
			velocidad_del_gpu: product.procesador.velocidad_del_gpu,
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
							let result = validateProcessor(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="modelo_del_procesador">
										{({ field }) => (
											<TextField
												label="Modelo del procesador"
												placeholder="Ej Snapdragon 888 5G"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="modelos_de_cpu">
										{({ field }) => (
											<TextField
												label="Modelos de CPU"
												placeholder="Ej 4x1.3 GHz Cortex-A53"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="cantidad_de_núcleos_del_procesador">
										{({ field }) => (
											<TextField
												label="Cantidad de núcleos del procesador"
												placeholder="Ej 4"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="velocidad_del_procesador">
										{({ field }) => (
											<TextField
												label="Velocidad del procesador (GHz)"
												placeholder="Ej 1.3"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="modelo_de_gpu">
										{({ field }) => (
											<TextField
												label="Modelo de GPU"
												placeholder="Ej Adreno 308"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="velocidad_del_gpu">
										{({ field }) => (
											<TextField
												label="Velocidad del GPU"
												placeholder="Ej 485 MHz"
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
										sectionName={"procesador"}
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
