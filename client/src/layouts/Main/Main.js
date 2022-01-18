import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from './AppBar';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
	root: {},
	main: {
		content: 'Loading',
		backgroundColor: 'black',
		color: 'white',
		opacity: 0.5,

		fontSize: 30,

		position: 'fixed',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		cursor: 'not-allowed',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 500,
		cursor: 'not-allowed!important',
	},
}));

export default function Admin(props) {
	const { children } = props;
	const { uiSearchingProducts } = useSelector((state) => state.ui);

	const classes = useStyles();

	return (
		<div style={{ overflow: 'hidden' }}>
			<AppBar />
			{uiSearchingProducts.isLoading ? (
				<div className={classes.main}>
					<CircularProgress color="inherit" />
				</div>
			) : null}
			<main>{children}</main>
			<Footer />
		</div>
	);
}
