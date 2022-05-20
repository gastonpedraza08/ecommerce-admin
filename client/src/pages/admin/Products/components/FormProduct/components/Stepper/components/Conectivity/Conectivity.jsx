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

import { validateConectivity } from 'helpers/validateProduct';

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
				red: '',
				tipo_de_conector_de_carga: '',
				con_conector_usb: '',
				con_jack_3_punto_5: '',
				con_wi_fi: '',
				con_gps: '',
				con_bluetooth: '',
				con_nfc: '',
				con_radio: '',
				con_sintonizador_de_tv: '',
				con_mini_hdmi: '',
			}
		} else {
			return {
				red: product.red,
				tipo_de_conector_de_carga: product.tipo_de_conector_de_carga,
				con_conector_usb: product.con_conector_usb,
				con_jack_3_punto_5: product.con_jack_3_punto_5,
				con_wi_fi: product.con_wi_fi,
				con_gps: product.con_gps,
				con_bluetooth: product.con_bluetooth,
				con_nfc: product.con_nfc,
				con_radio: product.con_radio,
				con_sintonizador_de_tv: product.con_sintonizador_de_tv,
				con_mini_hdmi: product.con_mini_hdmi,
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
							let result = validateConectivity(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="red">
										{({ field }) => (
											<TextField
												label="Red"
												placeholder="Ej 4G"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tipo_de_conector_de_carga">
										{({ field }) => (
											<TextField
												label="Tipo de conector de carga"
												placeholder="Ej USB-C"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_conector_usb">
										{({ field }) => (
											<TextField
												label="Con conector USB"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_jack_3_punto_5">
										{({ field }) => (
											<TextField
												label="Con jack 3.5"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_wi_fi">
										{({ field }) => (
											<TextField
												label="Con Wi-Fi"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_gps">
										{({ field }) => (
											<TextField
												label="Con GPS"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_bluetooth">
										{({ field }) => (
											<TextField
												label="Con Bluetooth"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_nfc">
										{({ field }) => (
											<TextField
												label="Con NFC"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_radio">
										{({ field }) => (
											<TextField
												label="Con radio"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_sintonizador_de_tv">
										{({ field }) => (
											<TextField
												label="Con sintonizador de TV"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_mini_hdmi">
										{({ field }) => (
											<TextField
												label="Con mini HDMI"
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
