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

import { validateOthers } from 'helpers/validateProduct';

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

	if (!product.otros) {
		initialValues = {
			con_imei: '',
			compañía_telefónica: '',
			incluye_lápiz: '',
			con_botón_sos: '',
			es_kit: '',
		}
	} else {
		initialValues = {
			con_imei: product.otros.con_imei,
			compañía_telefónica: product.otros.compañía_telefónica,
			incluye_lápiz: product.otros.incluye_lápiz,
			con_botón_sos: product.otros.con_botón_sos,
			es_kit: product.otros.es_kit,
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
							let result = validateOthers(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_imei">
										{({ field }) => (
											<TextField
												label="Con IMEI"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="compañía_telefónica">
										{({ field }) => (
											<TextField
												label="Compañía telefónica"
												placeholder="Ej Liberado"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="incluye_lápiz">
										{({ field }) => (
											<TextField
												label="Incluye lápiz"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_botón_sos">
										{({ field }) => (
											<TextField
												label="Con botón SOS"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="es_kit">
										{({ field }) => (
											<TextField
												label="Es KIT"
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
										sectionName={"otros"}
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
