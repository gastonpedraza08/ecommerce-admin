import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Button,
  Grid,
} from "@material-ui/core";

import { fetchWithToken } from "helpers/fetch";
import { CustomRouterLink } from 'components';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonLogin: {
		marginTop: theme.spacing(2)
	}
}));

export default function ActivationScreen(props) {

	const classes = useStyles();
	const { token } = useParams();

	const [activationData, setActivationData] = useState({
		isLoading: true,
		error: null,
		success: false
	});

	useEffect(() => {
		(async () => {
			const result = await fetchWithToken("auth/activation", {}, "POST", token);
			if (result.data.ok) {
				setActivationData(prev => {
					return {
						...prev,
						isLoading: false,
						success: true,
					}
				});
			} else {
				setActivationData(prev => {
					return {
						...prev,
						isLoading: false,
						error: result.data.error || true
					}
				});
			}
		})();
	}, [token]);


	return (
		<Grid container className={classes.root}>
			{
				activationData.isLoading ?
				(
					<Grid item>
						<Typography variant="h1">
							Loading...
						</Typography>
					</Grid>
				)
				:
				(
					<Grid item>
						{
							activationData.success ?
							(
								<>
									<Typography variant="h2">
										Se ha verificado la cuenta.
									</Typography>
									<Button
										className={classes.buttonLogin}
										variant="contained" 
										color="primary" 
										disableElevation
										component={CustomRouterLink}
										to="/auth/login"
									>
										Iniciar Sesion
									</Button>
								</>
							)
							:
							(
								<>
									<Typography variant="h2">
										El link ha expirado.
									</Typography>
								</>
							)
						}
					</Grid>
				)
			}
		</Grid>
	);
}