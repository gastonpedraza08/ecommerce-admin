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
	imagesContainer: {
		backgroundColor: 'red'
	},
	infoContainer: {
		backgroundColor: 'green'
	}
}));


export default function SearchProduct() {
	const classes = useStyles();
	const { id } = useParams();

	return (
		<div className={classes.root}>
			<Grid container>
				{/*main*/}
				<Grid item xs={12} sm={12} md={9}>
					<Grid container>
						<Grid className={classes.imagesContainer} item xs={12} sm={6} md={6}>
							imagenes
						</Grid>
						<Grid className={classes.infoContainer} item xs={12} sm={6} md={6}>
							info aqui
						</Grid>
					</Grid>
				</Grid>

				{/*sidebar*/}
				<Grid item xs={12} sm={12} md={3}>
				    contenido
				</Grid>
			</Grid>
		</div>
	);
}

