import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, FastField, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Alert, AlertTitle } from '@material-ui/lab';

import UploadAlbum from 'components/UploadAlbum';

import { validateFormEditUser } from 'helpers/validateForms';
import { usersUpdateUser } from 'actions/users';
import { fetchWithoutToken } from 'helpers/fetch';

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
	const { id } = useParams();
	const dispatch = useDispatch();
	const [isTouched, setIsTouched] = useState(false);
	const {
		uiUpdateUser: { isLoading, error, success },
	} = useSelector((state) => state.ui);
	const classes = useStyles();
	const [images, setImages] = useState([]);
	const [changePassword, setChangePassword] = useState(false);

	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		roleId: '2',
		avatarUrl: '',
		enabled: 'true'
	});

	useEffect(() => {
		(async () => {
			const result = await fetchWithoutToken("users/" + id, "GET");
			let user = result.data.user;
			user.enabled = user.state === "Verificado" ? "true" : "false";
			setUser({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				roleId: user.roleId,
				enabled: user.enabled,
				password: ''
			});
			if (user.avatarUrl) {
				setImages([
					{
						url: user.avatarUrl
					}
				]);
			}
		})();
	}, [id]);

	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<Formik
						enableReinitialize={true}
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={user}
						validate={(values) =>
							validateFormEditUser(values, changePassword)
						}
						onSubmit={(values) => {

							const user = {
								...values,
								avatarUrl: images[0] ? images[0].url : null,
								enabled: values.enabled === "true" ? true : false,
								roleId: Number(values.roleId),
								password: values.password === '' ? undefined : values.password
							};


							dispatch(usersUpdateUser(user, id));
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
									<Field name="password">
										{({ field }) => (
											<TextField
												label={changePassword ? "New Password" : "*******"}
												variant="outlined"
												disabled={!changePassword}
												{...field}
											/>
										)}
									</Field>
								</FormControl>
								<div className={clsx(classes.marginBottom)}>
									<FormControlLabel
								        control={
								          <Switch
								            checked={changePassword}
								            onChange={() => setChangePassword(prev => {
								            	formikProps.setFieldValue('password', '');
								            	return !prev
								            })}
								            name="checkedB"
								            color="primary"
								          />
								        }
								        label="Change Password"
								      />
								</div>
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
									<UploadAlbum
										images={images}
										setImages={setImages}
										limit={1}
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
