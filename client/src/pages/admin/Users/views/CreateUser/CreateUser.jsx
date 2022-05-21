import React, { useState } from 'react';
import { Formik, Form,	FastField } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';

import { UploadAlbum } from 'components';

import { validateFormUser } from 'helpers/validateForms';
import { usersCreateUser } from 'actions/users';

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
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	marginBottom: {
		marginBottom: theme.spacing(2),
	},
	textField: {
		width: '25ch',
	},
	textFieldSmall: {
		width: '30%',
	},
	error: {
		marginTop: theme.spacing(2),
		width: '100%'
	},
}));

export default function FormProduct() {
	const dispatch = useDispatch();
	const [isTouched, setIsTouched] = useState(false);
	const {
		uiCreateUser: { isLoading, error, success },
	} = useSelector((state) => state.ui);
	const classes = useStyles();
	const [images, setImages] = useState([]);
	const limitImages = 1;

	const setImagesFn = (payload, type) => {
		if (type === 'add') {
			setImages((prev) => {
				let fullArr = prev.concat(payload);
				if (fullArr.length > limitImages) {
					fullArr = fullArr.slice(-limitImages);
				}
				return fullArr;
			});
		} else if (type === 'delete') {
			setImages(prev => {
				return prev.filter(image => image.url!==payload);
			});
		}
	}

	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<Formik
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={{
							firstName: 'gaston',
							lastName: 'pedraza',
							email: 'gp.ju.dev@gmail.com',
							password: 'abcd1234',
							roleId: '2',
							avatarUrl: '',
							enabled: 'true'
						}}
						validate={(values) =>
							validateFormUser(values)
						}
						onSubmit={(values) => {

							const user = {
								...values,
								avatarUrl: images[0]?.url,
								enabled: values.enabled === "true" ? true : false,
								roleId: Number(values.roleId)
							};

							dispatch(usersCreateUser(user));
							setIsTouched(true);
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<FormControl 
									fullWidth
									variant="outlined" 
									className={clsx(classes.marginBottom)}
								>
									<FastField name="firstName">
										{({ field }) => (
											<TextField
												label="Nombre"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl 
									fullWidth
									variant="outlined" 
									className={clsx(classes.marginBottom)}
								>
									<FastField name="lastName">
										{({ field }) => (
											<TextField
												label="Apellido"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl 
									fullWidth
									variant="outlined" 
									className={clsx(classes.marginBottom)}
								>
									<FastField name="email">
										{({ field }) => (
											<TextField
												label="Email"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<FormControl 
									fullWidth
									variant="outlined" 
									className={clsx(classes.marginBottom)}
								>
									<FastField name="password">
										{({ field }) => (
											<TextField
												label="Password"
												variant="outlined"
												{...field}
											/>
										)}
									</FastField>
								</FormControl>
								<Grid container spacing={2} className={clsx(classes.marginBottom)}>
									<Grid item xs={12} sm={6} md={4}>
										<FastField name="roleId">
											{({ field }) => (
												<TextField
													style={{ width: '100%' }}
													select
													{...field}
													label="Role"
													variant="outlined"
													SelectProps={{
														native: true,
													}}
												>
													<option value="1">Admin</option>
													<option value="2">Subscriber</option>
												</TextField>
											)}
										</FastField>
									</Grid>
									<Grid item xs={12} sm={6} md={4}>
										<FastField name="enabled">
											{({ field }) => (
												<TextField
													style={{ width: '100%' }}
													select
													{...field}
													label="Estado"
													variant="outlined"
													SelectProps={{
														native: true,
													}}
												>
													<option value="true">Verificado</option>
													<option value="false">Deshabilitado (requiere activación)</option>
												</TextField>
											)}
										</FastField>
									</Grid>
								</Grid>
								<Grid container className={clsx(classes.marginBottom)}>
									<Typography variant="subtitle1" gutterBottom>
										Foto de perfil
									</Typography>
									<UploadAlbum
										images={images}
										setImagesFn={setImagesFn}
										limit={limitImages}
									/>
								</Grid>
								<Grid container className={clsx(classes.marginBottom)}>
									{Object.values(formikProps.errors).map((msg) => (
										<Typography variant="body1" color="error" key={msg}>
											{msg}
										</Typography>
									))}
								</Grid>
								{isTouched && error ? (
									<Grid container className={clsx(classes.marginBottom)}>
										<Alert severity="error" className={classes.error}>
											<AlertTitle>Error</AlertTitle>
											<strong>{error}</strong>
										</Alert>
									</Grid>
								) : null}
								{isTouched && success ? (
									<Grid container className={clsx(classes.marginBottom)}>
										<Alert severity="success" className={classes.error}>
											<AlertTitle>Correcto</AlertTitle>
											<strong>El usuario se ha creado con éxito!</strong>
										</Alert>
									</Grid>
								) : null}
								<div className={clsx(classes.marginBottom)}>
									<Button 
										color="primary" 
										variant="contained" 
										type="submit"
										disabled={isLoading}
									>
										Submit
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</Grid>
			</Grid>
		</div>
	);
}
