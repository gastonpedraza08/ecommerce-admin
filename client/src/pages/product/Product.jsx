import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from "@material-ui/styles";
import { fetchWithoutToken } from "helpers/fetch";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import CarouselImagesPrev from './components/CarouselImagesPrev';
import AdvancedInfo from './components/AdvancedInfo';

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
		backgroundColor: 'white',
		height: 400
	},
	infoContainer: {
		backgroundColor: 'transparent',
	},
	image: {
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		width: '100%',
		height: '85%'
	},
	imageButton: {
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		width: 50,
		height: 50,
		cursor: 'pointer',
		border: '1px solid transparent',
		'&:hover': {
			border: '1px solid #ccc',
			filter: 'brightness(80%)'
		},
	},
	buttonChangeImageContainer: {
		height: 'auto',
		[theme.breakpoints.down('sm')]: {
			width: '80%',
			margin: 'auto'
		},
	},
	secondaryInfo: {
		marginTop: theme.spacing(3)
	},
	infoList: {
		marginTop: theme.spacing(2)
	},
	description: {
		'& *': {
			color: '#666',
			fontSize: '20px',
			fontWeight: 400,
			wordBreak: 'break-word',
			lineHeight: '1.35',
		}
	},
	divider: {
		height: 2,
		color: '#ccc',
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(8),
	}
}));


export default function SearchProduct() {
	const classes = useStyles();
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		(async () => {
			const result = await fetchWithoutToken("products/" + id, "GET");
			const product = result.data.product;
			setProduct(product);
		})();
	}, [id]);

	if (!product) {
		return (
			<h1>Loading...</h1>
		);
	}

	const changeImage = (indice) => {
		setCurrentImage(indice);
	}

	return (
		<div className={classes.root}>
			<Grid container>
				{/*main*/}
				<Grid item xs={12} sm={12} md={9}>
					<Grid container justifyContent="center">
						<Grid item xs={10} sm={5} md={5}>
							<div className={classes.imagesContainer} >
								<div 
									className={classes.image}
									style={{
										backgroundImage: `url(${product.images[currentImage]})`
									}}
								/>
								<div className={classes.buttonChangeImageContainer}>
									<CarouselImagesPrev>
										{
											product.images.map((image, i) => {
												return (
													<div 
														key={i}
														className={classes.imageButton} 
														style={{
															backgroundImage: `url(${image})`
														}}
														onClick={() => changeImage(i)}
													>
													</div>
												);
											})
										}
									</CarouselImagesPrev>
								</div>
							</div>
						</Grid>
						<Grid item sm={1}></Grid>
						<Grid className={classes.infoContainer} item xs={11} sm={5} md={5}>
							<div>
								<Typography variant="h2" component="h1">
								  {product.name}
								</Typography>
							</div>
							<div className={classes.secondaryInfo}>
								<div>
									<Typography variant="h3" component="h2">
									 $ {product.price}
									</Typography>
								</div>
								<ul className={classes.infoList}>
									<li>
										<div>
											<Typography variant="body1">
											  Condición: {product.condition}
											</Typography>
										</div>								
									</li>
									<li>
										<div>
											<Typography variant="body1">
											  Stock: {product.stock}
											</Typography>
										</div>								
									</li>
									<li>
										<div>
											<Typography variant="body1">
											  Marca: {product.marca}
											</Typography>
										</div>								
									</li>
								</ul>
							</div>
						</Grid>
					</Grid>
					<Divider className={classes.divider} />
					<AdvancedInfo product={product} />
					<Divider className={classes.divider} />
					<div>
						<Typography variant="h3" style={{marginBottom: 32}}>
						  Descripción
						</Typography>
						<div 
							dangerouslySetInnerHTML={{ 
								__html: product.description
							}}
							className={classes.description}
						></div>
					</div>
				</Grid>

				{/*sidebar*/}
				<Grid item xs={12} sm={12} md={3}>
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
			    <p>Hola mundo</p><br /><br /><br /><br /><br />
				</Grid>
			</Grid>
			<div>SEPARADOR</div>
		</div>
	);
}

