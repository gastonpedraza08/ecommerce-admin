import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import { CustomRouterLink } from 'components';
import { Table } from '../../components';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
	},
	addProductButton: {
		marginBottom: theme.spacing(2),
	},
	error: {
		marginTop: theme.spacing(2),
	},
}));

export default function Products() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Button
				color="primary"
				variant="contained"
				size="medium"
				className={classes.addProductButton}
				component={CustomRouterLink}
				to="/admin/products/create"
			>
				Agregar Producto
			</Button>
			<Table />
		</div>
	);
}
