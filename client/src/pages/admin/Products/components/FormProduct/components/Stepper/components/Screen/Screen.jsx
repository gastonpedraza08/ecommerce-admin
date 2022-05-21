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

import { validateScreen } from 'helpers/validateProduct';

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

	if (!product.pantalla) {
		initialValues = {
			tamaño_de_la_pantalla: '',
			tipo_de_resolución_de_la_pantalla_: '',
			resolución_de_la_pantalla: '',
			tecnología_de_la_pantalla: '',
			tipo_de_pantalla: '',
			relación_de_aspecto_de_la_pantalla: '',
			píxeles_por_pulgada_de_la_pantalla: '',
			frecuencia_de_actualización_de_la_pantalla: '',
			brillo_máximo_de_la_pantalla: '',
			con_pantalla_táctil: '',
			tamaño_de_la_pantalla_plegada: '',
			resolución_de_la_pantalla_plegada: '',
			píxeles_por_pulgada_de_la_pantalla_plegada: '',
			brillo_máximo_de_la_pantalla_secundaria: '',
			relación_de_aspecto_de_la_pantalla_secundaria: '',
			con_pantalla_plegable: '',
			tecnología_de_la_pantalla_secundaria: '',
			tamaño_de_la_pantalla_secundaria: '',
			resolución_de_la_pantalla_secundaria: '',
			píxeles_por_pulgada_de_la_pantalla_secundaria: '',
			con_pantalla_secundaria_táctil: '',
			frecuencia_de_actualización_de_la_pantalla_secundaria: '',
		}
	} else {
		initialValues = {
			tamaño_de_la_pantalla: product.pantalla.tamaño_de_la_pantalla,
			tipo_de_resolución_de_la_pantalla_: product.pantalla.tipo_de_resolución_de_la_pantalla_,
			resolución_de_la_pantalla: product.pantalla.resolución_de_la_pantalla,
			tecnología_de_la_pantalla: product.pantalla.tecnología_de_la_pantalla,
			tipo_de_pantalla: product.pantalla.tipo_de_pantalla,
			relación_de_aspecto_de_la_pantalla: product.pantalla.relación_de_aspecto_de_la_pantalla,
			píxeles_por_pulgada_de_la_pantalla: product.pantalla.píxeles_por_pulgada_de_la_pantalla,
			frecuencia_de_actualización_de_la_pantalla: product.pantalla.frecuencia_de_actualización_de_la_pantalla,
			brillo_máximo_de_la_pantalla: product.pantalla.brillo_máximo_de_la_pantalla,
			con_pantalla_táctil: product.pantalla.con_pantalla_táctil,
			tamaño_de_la_pantalla_plegada: product.pantalla.tamaño_de_la_pantalla_plegada,
			resolución_de_la_pantalla_plegada: product.pantalla.resolución_de_la_pantalla_plegada,
			píxeles_por_pulgada_de_la_pantalla_plegada: product.pantalla.píxeles_por_pulgada_de_la_pantalla_plegada,
			brillo_máximo_de_la_pantalla_secundaria: product.pantalla.brillo_máximo_de_la_pantalla_secundaria,
			relación_de_aspecto_de_la_pantalla_secundaria: product.pantalla.relación_de_aspecto_de_la_pantalla_secundaria,
			con_pantalla_plegable: product.pantalla.con_pantalla_plegable,
			tecnología_de_la_pantalla_secundaria: product.pantalla.tecnología_de_la_pantalla_secundaria,
			tamaño_de_la_pantalla_secundaria: product.pantalla.tamaño_de_la_pantalla_secundaria,
			resolución_de_la_pantalla_secundaria: product.pantalla.resolución_de_la_pantalla_secundaria,
			píxeles_por_pulgada_de_la_pantalla_secundaria: product.pantalla.píxeles_por_pulgada_de_la_pantalla_secundaria,
			con_pantalla_secundaria_táctil: product.pantalla.con_pantalla_secundaria_táctil,
			frecuencia_de_actualización_de_la_pantalla_secundaria: product.pantalla.frecuencia_de_actualización_de_la_pantalla_secundaria,
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
							let result = validateScreen(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tamaño_de_la_pantalla">
										{({ field }) => (
											<TextField
												label="Tamaño de la pantalla (en pulgadas)"
												placeholder="Ej 6.5"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tipo_de_resolución_de_la_pantalla_">
										{({ field }) => (
											<TextField
												label="Tipo de resolución de la pantalla"
												placeholder="Ej Full HD+"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="resolución_de_la_pantalla">
										{({ field }) => (
											<TextField
												label="Resolución de la pantalla"
												placeholder="Ej 1080 px x 2400 px"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tecnología_de_la_pantalla">
										{({ field }) => (
											<TextField
												label="Tecnología de la pantalla"
												placeholder="Ej PLS"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tipo_de_pantalla">
										{({ field }) => (
											<TextField
												label="Tipo de pantalla"
												placeholder="Ej Infinity-U Display"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="relación_de_aspecto_de_la_pantalla">
										{({ field }) => (
											<TextField
												label="Relación de aspecto de la pantalla"
												placeholder="Ej 20:9"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="píxeles_por_pulgada_de_la_pantalla">
										{({ field }) => (
											<TextField
												label="Píxeles por pulgada de la pantalla"
												placeholder="Ej 411"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="frecuencia_de_actualización_de_la_pantalla">
										{({ field }) => (
											<TextField
												label="Frecuencia de actualización de la pantalla"
												placeholder="Ej 60 Hz"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="brillo_máximo_de_la_pantalla">
										{({ field }) => (
											<TextField
												label="Brillo máximo de la pantalla"
												placeholder="Ej 800 cd/m²"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_pantalla_táctil">
										{({ field }) => (
											<TextField
												label="Con pantalla táctil"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tamaño_de_la_pantalla_plegada">
										{({ field }) => (
											<TextField
												label="Tamaño de la pantalla plegada"
												placeholder='Ej 1.9 "'
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="resolución_de_la_pantalla_plegada">
										{({ field }) => (
											<TextField
												label="Resolución de la pantalla plegada"
												placeholder="Ej 260 x 512"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="píxeles_por_pulgada_de_la_pantalla_plegada">
										{({ field }) => (
											<TextField
												label="Píxeles por pulgada de la pantalla plegada"
												placeholder="Ej 282 dpi"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="brillo_máximo_de_la_pantalla_secundaria">
										{({ field }) => (
											<TextField
												label="Brillo máximo de la pantalla secundaria"
												placeholder="Ej 600 cd/m²"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="relación_de_aspecto_de_la_pantalla_secundaria">
										{({ field }) => (
											<TextField
												label="Relación de aspecto de la pantalla secundaria"
												placeholder="Ej 25 - 9"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_pantalla_plegable">
										{({ field }) => (
											<TextField
												label="Con pantalla plegable"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tecnología_de_la_pantalla_secundaria">
										{({ field }) => (
											<TextField
												label="Tecnología de la pantalla secundaria"
												placeholder="Ej Super AMOLED"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tamaño_de_la_pantalla_secundaria">
										{({ field }) => (
											<TextField
												label="Tamaño de la pantalla secundaria"
												placeholder='Ej 6.2 "'
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="resolución_de_la_pantalla_secundaria">
										{({ field }) => (
											<TextField
												label="Resolución de la pantalla secundaria"
												placeholder="Ej 260 px x 512 px"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="píxeles_por_pulgada_de_la_pantalla_secundaria">
										{({ field }) => (
											<TextField
												label="Píxeles por pulgada de la pantalla secundaria"
												placeholder="Ej 302 ppi"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_pantalla_secundaria_táctil">
										{({ field }) => (
											<TextField
												label="Con pantalla secundaria táctil"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="frecuencia_de_actualización_de_la_pantalla_secundaria">
										{({ field }) => (
											<TextField
												label="Frecuencia de actualización de la pantalla secundaria"
												placeholder="Ej 120 Hz"
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
										sectionName={"pantalla"}
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
