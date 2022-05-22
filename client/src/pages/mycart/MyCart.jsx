import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
	Formik,
	Form,
} from 'formik';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { validateBasicInfo } from 'helpers/validateProduct';
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
}));

export default function FormProduct() {
	const classes = useStyles();
	const { id } = useParams();

	useEffect(() => {
		//const result = await fetchWithoutToken("auth/login", values, "POST");
    //if (!result.error) {
    if (true){
    } else {

    }
	}, [id]);

	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<Formik
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={{}}
						validate={(values) => {
							let result = validateBasicInfo(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>

							</Form>
						)}
					</Formik>
				</Grid>
			</Grid>
		</div>
	);
}
