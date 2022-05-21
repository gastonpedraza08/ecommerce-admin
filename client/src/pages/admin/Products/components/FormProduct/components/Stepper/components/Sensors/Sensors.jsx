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

import { validateSensors } from 'helpers/validateProduct';

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

	if (!product.sensores) {
		initialValues = {
			con_acelerómetro: '',
			con_sensor_de_proximidad: '',
			con_giroscopio: '',
			con_brújula: '',
			con_barómetro: '',
			con_sensor_de_ritmo_cardíaco: '',
		}
	} else {
		initialValues = {
			con_acelerómetro: product.sensores.con_acelerómetro,
			con_sensor_de_proximidad: product.sensores.con_sensor_de_proximidad,
			con_giroscopio: product.sensores.con_giroscopio,
			con_brújula: product.sensores.con_brújula,
			con_barómetro: product.sensores.con_barómetro,
			con_sensor_de_ritmo_cardíaco: product.sensores.con_sensor_de_ritmo_cardíaco,
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
							let result = validateSensors(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_acelerómetro">
										{({ field }) => (
											<TextField
												label="Con acelerómetro"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_sensor_de_proximidad">
										{({ field }) => (
											<TextField
												label="Con sensor de proximidad"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_giroscopio">
										{({ field }) => (
											<TextField
												label="Con giroscopio"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_brújula">
										{({ field }) => (
											<TextField
												label="Con brújula"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_barómetro">
										{({ field }) => (
											<TextField
												label="Con barómetro"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_sensor_de_ritmo_cardíaco">
										{({ field }) => (
											<TextField
												label="Con sensor de ritmo cardíaco"
												placeholder="Ej Sí"
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
										sectionName={"sensores"}
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
