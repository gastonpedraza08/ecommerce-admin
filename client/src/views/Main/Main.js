import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import Container from './Container';
import { Carousel } from 'components';
import BenefitsSection from './Content/BenefitsSection';
import SlideProducts from 'components/SlideProducts';
import Product from 'components/SlideProducts/Product';
import { slideLoadCurrentSlides } from 'actions/slides';
import { productsLoadProductsSections } from 'actions/products';

const useStyles = makeStyles((theme) => ({
	root: {
		overflow: 'hidden',
		[theme.breakpoints.up("xs")]: {
	  	marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.up("sm")]: {
    	marginBottom: theme.spacing(7),
    },
    [theme.breakpoints.up("md")]: {
    	marginBottom: theme.spacing(9),
    },
	},
	productsSection: {
		marginBottom: theme.spacing(5),
	},
	middleSection: {
		backgroundColor: theme.palette.secondary.dark,
		width: '100vw',
		position: 'relative',
		left: '50%',
		right: '50%',
		marginLeft: '-50vw',
		marginRight: '-50vw',
		marginBottom: theme.spacing(10),
		[theme.breakpoints.up('xs')]: {
			padding: theme.spacing(3),
		},
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(6),
		},
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(9),
		},
	},
	middleSectionTitle: {
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(4),
		textAlign: 'center',
	},
	sectionTitle: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
}));

export default function MainApp() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { slideCurrentSlides } = useSelector((state) => state.slides);
	const { productsSections } = useSelector((state) => state.products);

	const [middleIndex, setMiddleIndex] = useState(0);

	const { uiLoadingCurrentSlides, uiAllProductsSections } = useSelector(
		(state) => state.ui
	);

	useEffect(() => {
		if (productsSections.length === 0) {
			dispatch(productsLoadProductsSections());
		}
		if (slideCurrentSlides.length === 0) {
			dispatch(
				slideLoadCurrentSlides(
					`?order=ASC&from=1&limit=10&isCurrentSelected=true`
				)
			);
		}
	}, [dispatch, productsSections.length, slideCurrentSlides.length]);

	useEffect(() => {
		if (productsSections.length % 2 === 0) {
			setMiddleIndex(Math.round(productsSections.length / 2) - 1);
		} else {
			setMiddleIndex(Math.floor(productsSections.length / 2));
		}
	}, [productsSections]);

	return (
		<div className={classes.root}>
			{uiLoadingCurrentSlides.error ? (
				<Alert severity="error">
					<AlertTitle>Fallo al cargar las slides.</AlertTitle>
					<p>
						Debido a que es un proyecto personal que consume servicios gratuitos
						limitados, el desarrollador mantiene pausado los servidores.
					</p>
					<p>Comunicate con el:</p>
					<ul>
						<li>
							Mail: <strong>gastonpedraza.developer@gmail.com</strong>
						</li>
						<li>
							Whatsapp: <strong>+54 3886087452</strong>
						</li>
						<li>
							Linkedin:{' '}
							<strong>https://www.linkedin.com/in/gaston-pedraza/</strong>
						</li>
					</ul>
				</Alert>
			) : (
				<Carousel slides={slideCurrentSlides} />
			)}
			<BenefitsSection />
			{uiAllProductsSections.error ? (
				<Alert severity="error">
					<AlertTitle>Fallo al cargar los productos.</AlertTitle>
					<p>
						Debido a que es un proyecto personal que consume servicios gratuitos
						limitados, el desarrollador mantiene pausado los servidores.
					</p>
					<p>Comunicate con el:</p>
					<ul>
						<li>
							Mail: <strong>gastonpedraza.developer@gmail.com</strong>
						</li>
						<li>
							Whatsapp: <strong>+54 3886087452</strong>
						</li>
						<li>
							Linkedin:{' '}
							<strong>https://www.linkedin.com/in/gaston-pedraza/</strong>
						</li>
					</ul>
				</Alert>
			) : (
				<Container>
					{productsSections.map((productsSection, i) => {
						return (
							<div className={classes.productsSection} key={productsSection.id}>
								<Typography
									className={
										i === middleIndex
											? classes.middleSectionTitle
											: classes.sectionTitle
									}
									variant="h2"
									gutterBottom
								>
									{productsSection.name}
								</Typography>
								<SlideProducts
									className={i === middleIndex ? classes.middleSection : null}
								>
									{productsSection.Products.map((product) => {
										return <Product key={product.id} product={product} />;
									})}
								</SlideProducts>
							</div>
						);
					})}
				</Container>
			)}
		</div>
	);
}
