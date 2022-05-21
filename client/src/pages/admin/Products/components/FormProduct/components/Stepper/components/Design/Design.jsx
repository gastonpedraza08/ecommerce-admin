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

import { validateDesign } from 'helpers/validateProduct';

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

	if (!product.diseno_y_resistencia) {
		initialValues = {
			con_teclado_qwerty_físico: '',
			es_a_prueba_de_agua: '',
			es_resistente_al_agua: '',
			es_resistente_al_polvo: '',
			clasificación_ip: '',
			es_resistente_a_caídas: '',
			es_resistente_a_salpicaduras: '',
		}
	} else {
		initialValues = {
			con_teclado_qwerty_físico: product.diseno_y_resistencia.con_teclado_qwerty_físico,
			es_a_prueba_de_agua: product.diseno_y_resistencia.es_a_prueba_de_agua,
			es_resistente_al_agua: product.diseno_y_resistencia.es_resistente_al_agua,
			es_resistente_al_polvo: product.diseno_y_resistencia.es_resistente_al_polvo,
			clasificación_ip: product.diseno_y_resistencia.clasificación_ip,
			es_resistente_a_caídas: product.diseno_y_resistencia.es_resistente_a_caídas,
			es_resistente_a_salpicaduras: product.diseno_y_resistencia.es_resistente_a_salpicaduras,
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
							let result = validateDesign(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_teclado_qwerty_físico">
										{({ field }) => (
											<TextField
												label="Con teclado QWERTY físico"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="es_a_prueba_de_agua">
										{({ field }) => (
											<TextField
												label="Es a prueba de agua"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="es_resistente_al_agua">
										{({ field }) => (
											<TextField
												label="Es resistente al agua"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="es_resistente_al_polvo">
										{({ field }) => (
											<TextField
												label="Es resistente al polvo"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="clasificación_ip">
										{({ field }) => (
											<TextField
												label="Clasificación IP"
												placeholder="Ej IP68"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="es_resistente_a_caídas">
										{({ field }) => (
											<TextField
												label="Es resistente a caídas"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="es_resistente_a_salpicaduras">
										{({ field }) => (
											<TextField
												label="Es resistente a salpicaduras"
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
										sectionName={"diseno_y_resistencia"}
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
