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

import { validateCamera } from 'helpers/validateProduct';

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

	if (!product.camara) {
		initialValues = {
			resolución_de_la_cámara_trasera_principal: '',
			resolución_de_video_de_la_cámara_trasera: '',
			resolución_de_la_cámara_frontal_principal: '',
			con_cámara: '',
			características_principales_de_las_cámaras: '',
			cantidad_de_cámaras_traseras: '',
			resolución_de_las_cámaras_traseras: '',
			apertura_del_diafragma_de_la_cámara_trasera: '',
			cantidad_de_cámaras_frontales: '',
			resolución_de_video_de_la_cámara_frontal: '',
			apertura_del_diafragma_de_la_cámara_frontal: '',
			con_flash_en_la_cámara_frontal: '',
			zoom_digital: '',
			zoom_óptico: '',
			zoom_híbrido: '',
			resolución_de_las_cámaras_frontales: '',
			tipos_de_cámaras_traseras: '',
			tipos_de_cámaras_frontales: '',
		}
	} else {
		initialValues = {
			resolución_de_la_cámara_trasera_principal: product.camara.resolución_de_la_cámara_trasera_principal,
			resolución_de_video_de_la_cámara_trasera: product.camara.resolución_de_video_de_la_cámara_trasera,
			resolución_de_la_cámara_frontal_principal: product.camara.resolución_de_la_cámara_frontal_principal,
			con_cámara: product.camara.con_cámara,
			características_principales_de_las_cámaras: product.camara.características_principales_de_las_cámaras,
			cantidad_de_cámaras_traseras: product.camara.cantidad_de_cámaras_traseras,
			resolución_de_las_cámaras_traseras: product.camara.resolución_de_las_cámaras_traseras,
			apertura_del_diafragma_de_la_cámara_trasera: product.camara.apertura_del_diafragma_de_la_cámara_trasera,
			cantidad_de_cámaras_frontales: product.camara.cantidad_de_cámaras_frontales,
			resolución_de_video_de_la_cámara_frontal: product.camara.resolución_de_video_de_la_cámara_frontal,
			apertura_del_diafragma_de_la_cámara_frontal: product.camara.apertura_del_diafragma_de_la_cámara_frontal,
			con_flash_en_la_cámara_frontal: product.camara.con_flash_en_la_cámara_frontal,
			zoom_digital: product.camara.zoom_digital,
			zoom_óptico: product.camara.zoom_óptico,
			zoom_híbrido: product.camara.zoom_híbrido,
			resolución_de_las_cámaras_frontales: product.camara.resolución_de_las_cámaras_frontales,
			tipos_de_cámaras_traseras: product.camara.tipos_de_cámaras_traseras,
			tipos_de_cámaras_frontales: product.camara.tipos_de_cámaras_frontales,
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
							let result = validateCamera(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="resolución_de_la_cámara_trasera_principal">
										{({ field }) => (
											<TextField
												label="Resolución de la cámara trasera principal"
												placeholder="Ej 64 px"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="resolución_de_video_de_la_cámara_trasera">
										{({ field }) => (
											<TextField
												label="Resolución de video de la cámara trasera"
												placeholder="Ej 1920 px x 1080 px"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="resolución_de_la_cámara_frontal_principal">
										{({ field }) => (
											<TextField
												label="Resolución de la cámara frontal principal"
												placeholder="Ej 20 px"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_cámara">
										{({ field }) => (
											<TextField
												label="Con cámara"
												placeholder="Ej Sí"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="características_principales_de_las_cámaras">
										{({ field }) => (
											<TextField
												label="Características principales de las cámaras"
												placeholder="Ej Autoenfoque, Flash LED, Foto HDR, Panorámica, Modo retrato"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="cantidad_de_cámaras_traseras">
										{({ field }) => (
											<TextField
												label="Cantidad de cámaras traseras"
												placeholder="Ej 4"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="resolución_de_las_cámaras_traseras">
										{({ field }) => (
											<TextField
												label="Resolución de las cámaras traseras"
												placeholder="Ej 64 Mpx/8 Mpx/5 Mpx/5 Mpx"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="apertura_del_diafragma_de_la_cámara_trasera">
										{({ field }) => (
											<TextField
												label="Apertura del diafragma de la cámara trasera"
												placeholder="Ej f 1.8/f 2.2/f 2.4/f 2.4"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="cantidad_de_cámaras_frontales">
										{({ field }) => (
											<TextField
												label="Cantidad de cámaras frontales"
												placeholder="Ej 1"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="resolución_de_video_de_la_cámara_frontal">
										{({ field }) => (
											<TextField
												label="Resolución de video de la cámara frontal"
												placeholder="Ej 1920 px x 1080 px"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="apertura_del_diafragma_de_la_cámara_frontal">
										{({ field }) => (
											<TextField
												label="Apertura del diafragma de la cámara frontal"
												placeholder="Ej f 2.2"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="con_flash_en_la_cámara_frontal">
										{({ field }) => (
											<TextField
												label="Con flash en la cámara frontal"
												placeholder="Ej No"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="zoom_digital">
										{({ field }) => (
											<TextField
												label="Zoom digital"
												placeholder="Ej 10x"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="zoom_óptico">
										{({ field }) => (
											<TextField
												label="Zoom óptico"
												placeholder="Ej 50x"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="zoom_híbrido">
										{({ field }) => (
											<TextField
												label="Zoom híbrido"
												placeholder="Ej 3x"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="resolución_de_las_cámaras_frontales">
										{({ field }) => (
											<TextField
												label="Resolución de las cámaras frontales"
												placeholder="Ej 1920 px x 1080 px"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tipos_de_cámaras_traseras">
										{({ field }) => (
											<TextField
												label="Tipos de cámaras traseras"
												placeholder="Ej Wide,Periscope Telephoto,Ultrawide"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl fullWidth variant="outlined" className={clsx(classes.marginTop)}>
									<FastField name="tipos_de_cámaras_frontales">
										{({ field }) => (
											<TextField
												label="Tipos de cámaras frontales"
												placeholder="Ej Wide"
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
										sectionName={"camara"}
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
