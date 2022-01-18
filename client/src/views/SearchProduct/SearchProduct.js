import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';

import Filter from './Filter';
import Product from './Product';
import Pagination from './Pagination';

import { productsSearchProducts } from "actions/products";

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		[theme.breakpoints.only('xs')]: {
			width: '95%',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		[theme.breakpoints.only('sm')]: {
			width: '95%',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		[theme.breakpoints.only('md')]: {
			width: '90%',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		[theme.breakpoints.up('lg')]: {
			width: '85%',
			marginLeft: theme.spacing(6)
		},
	},
	filter: {
		maxWidth: 200,
	},
	main: {
		backgroundColor: 'white',		
	},
	pagination: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(6),
		marginBottom: theme.spacing(6),
	},
}));


export default function SearchProduct() {
	const location = useLocation();
	const dispatch = useDispatch();
	const classes = useStyles();
	const { productsSearch } = useSelector(state => state.products);
	const { uiSearchingProducts } = useSelector(state => state.ui);

	useEffect(() => {
		dispatch(productsSearchProducts(location.search));
	}, []);

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12} sm={4} md={3}>
			    <div className={classes.filter}>
			    	<Filter />
			    </div>
				</Grid>
				<Grid item xs={12} sm={8} md={9}>
					<div className={classes.main}>
					{productsSearch.map(product => {
						return (
							<Product product={product} key={product.id} />
						);
					})}
					</div>
				</Grid>
			</Grid>
			<div className={classes.pagination}>
				<Pagination />				
			</div>
		</div>
	);
}

