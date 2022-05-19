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

import { validateOperatingSystem } from 'helpers/validateProduct';

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
		if (!product.nombre_del_sistema_operativo) {
			return {
				nombre_del_sistema_operativo: '',
				versión_original_del_sistema_operativo: '',
				capa_original_de_personalización_del_sistema_operativo: '',
				última_versión_compatible_del_sistema_operativo: '',
				edición_del_sistema_operativo: '',
				última_capa_compatible_de_personalización_del_sistema_operativo: '',
			}
		} else {
			return {
				nombre_del_sistema_operativo: product.nombre_del_sistema_operativo,
				versión_original_del_sistema_operativo: product.versión_original_del_sistema_operativo,
				capa_original_de_personalización_del_sistema_operativo: product.capa_original_de_personalización_del_sistema_operativo,
				última_versión_compatible_del_sistema_operativo: product.última_versión_compatible_del_sistema_operativo,
				edición_del_sistema_operativo: product.edición_del_sistema_operativo,
				última_capa_compatible_de_personalización_del_sistema_operativo: product.última_capa_compatible_de_personalización_del_sistema_operativo,
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
							let result = validateOperatingSystem(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="nombre_del_sistema_operativo">
										{({ field }) => (
											<TextField
												label="Nombre del Sistema Operativo"
												placeholder="Ej Android"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="versión_original_del_sistema_operativo">
										{({ field }) => (
											<TextField
												label="Versión original del Sistema Operativo"
												placeholder="Ej 11"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="capa_original_de_personalización_del_sistema_operativo">
										{({ field }) => (
											<TextField
												label="Capa original de personalización del Sistema Operativo"
												placeholder="Ej One UI 2.0"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="última_versión_compatible_del_sistema_operativo">
										{({ field }) => (
											<TextField
												label="Última Versión compatible del Sistema Operativo"
												placeholder="Ej 13"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="edición_del_sistema_operativo">
										{({ field }) => (
											<TextField
												label="Edición del Sistema Operativo"
												placeholder="Ej Go Edition"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="última_capa_compatible_de_personalización_del_sistema_operativo">
										{({ field }) => (
											<TextField
												label="Última capa compatible de personalización del Sistema Operativo"
												placeholder="Ej One UI 3.0"
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
