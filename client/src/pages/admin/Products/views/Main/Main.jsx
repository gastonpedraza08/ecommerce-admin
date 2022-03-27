import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';

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
	const {
		uiLoadingAllProducts: { isLoading, error },
	} = useSelector((state) => state.ui);
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
			<div>
				{isLoading ? <Typography variant="h4">Cargando...</Typography> : null}
			</div>
			<div>
				{error ? (
					<Alert severity="error" className={classes.error}>
						<AlertTitle>Error</AlertTitle>
						<strong>{error}</strong>
					</Alert>
				) : null}
			</div>
		</div>
	);
}
