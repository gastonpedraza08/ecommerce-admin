import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';

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
}));


export default function SearchProduct() {
	const classes = useStyles();
	const { id } = useParams();

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12} sm={8} md={9}>
					<div>
						<h1>{id}</h1>
						<br />
						<span>
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
							lorem ipsum dolor sit amet consecuit lorem ipsum dolor sit amet
						</span>
					</div>
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
				    contenido
				</Grid>
			</Grid>
		</div>
	);
}

