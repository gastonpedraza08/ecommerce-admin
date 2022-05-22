import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { fetchWithoutToken } from 'helpers/fetch';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: 'white',
		padding: theme.spacing(2),
		borderRadius: 20,
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(5)
	},
	form: {
		margin: theme.spacing(1),
		width: '100%',
	},
	infoContainer: {
		display: 'flex',
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	}
}));

export default function Checkout() {
	const classes = useStyles();
	const { id } = useParams();

	console.log(id)

	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<div className={classes.form}>
						<div className={classes.infoContainer}>
							<Typography variant="h3">
								Total 20
							</Typography>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
