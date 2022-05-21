import React from 'react';
import { useSelector } from 'react-redux';
import {
	Formik,
	Form,
} from 'formik';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import { HandleFormProductButton } from 'components';

import { validateSpecs } from 'helpers/validateProduct';
import config from 'assets/config/productView';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: 'white',
		padding: theme.spacing(2),
		borderRadius: 20,
		marginTop: theme.spacing(2),
	},
	form: {
		margin: theme.spacing(1),
		width: '100%',
	},
	marginTop: {
		marginTop: theme.spacing(2),
	},
	error: {
		marginTop: theme.spacing(2),
	},
	errorText: {
		display: 'block'
	},
	imageBasicInfo: {
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		width: 100,
		height: 100,
		margin: 10
	},
	imageBasicInfoContainer: {
		display: 'flex',
		flexWrap: 'nowrap'
	}
}));


export default function FormProduct() {
	const classes = useStyles();
	const { product } = useSelector(state => state.products.productForm);
	const { uiCreateProduct: { error } } = useSelector(state => state.ui);

	let initialValues = {};

	return (
		<div>
			<Grid container justifyContent="center">
				<Grid item xs={12} sm={10} md={8} className={classes.root}>
					<h2 style={{ marginBottom: 10}}>Confirma que los datos son correctos.</h2>
					<Formik
						validateOnChange={false}
						validateOnBlur={false}
						initialValues={initialValues}
						validate={(values) => {
							let result = validateSpecs(values)
							return result
						}}
					>
						{(formikProps) => (
							<Form className={classes.form}>
								<div>
									{
						        Object.keys(config).map(infotype => {
						        	if (infotype === "basic_info") {
							          return (
							            <div key={infotype}>
							            	<Accordion>
							            		<AccordionSummary>
								              	<h3>{config[infotype].name}</h3>
							            		</AccordionSummary>
							            		<AccordionDetails style={{display: 'block'}}>
									              <TableContainer component={Paper}>
									                <Table className={classes.table}>
									                  <TableBody>
									                    {Object.keys(config[infotype].list).map((n) => {
									                      if (product[infotype]) {
									                      	if (product[infotype][n]) {
									                      		if (n === "images" || n === "thumbnail") {
									                      			return null;
									                      		} else {
											                        return (
											                          <StyledTableRow key={n}>
											                            <StyledTableCell component="th" scope="row">
											                              {config[infotype].list[n].name}
											                            </StyledTableCell>
											                            <StyledTableCell align="right">
											                              {product[infotype][n]}
											                            </StyledTableCell>
											                          </StyledTableRow>
											                        )
									                      		}
									                      	} else {
									                      		return null;
									                      	}
									                      } else {
									                        return null;
									                      }
									                    })}
									                  </TableBody>
									                </Table>
									              </TableContainer>
									              <h3 style={{marginBottom: 3, marginTop: 6}}>Imagenes</h3>
									              <div className={classes.imageBasicInfoContainer}>
										              {
										              	product[infotype]["images"].map(img => {
										              		return (
										              			<div 
										              				key={img.url}
										              				style={{ 
										              					backgroundImage: `url(${img.url})`
										              				}}
										              				className={classes.imageBasicInfo}
										              			></div>
										              		)
										              	})
										              }
									              </div>
									              <h3 style={{marginBottom: 3, marginTop: 6}}>Miniatura</h3>
									              <div 
						              				style={{ 
						              					backgroundImage: `url(${product[infotype]["thumbnail"]})`
						              				}}
						              				className={classes.imageBasicInfo}
						              			></div>
							            		</AccordionDetails>
				              			</Accordion>
							            </div>
							          )
						        	} else {
						        		return (
							            <div key={infotype}>
							            	<Accordion>
							            		<AccordionSummary>
								              	<h3>{config[infotype].name}</h3>
							            		</AccordionSummary>
							            		<AccordionDetails>
									              <TableContainer component={Paper}>
									                <Table className={classes.table}>
									                  <TableBody>
									                    {Object.keys(config[infotype].list).map((n) => {
									                      if (product[infotype]) {
									                      	if (product[infotype][n]) {
										                        return (
										                          <StyledTableRow key={n}>
										                            <StyledTableCell component="th" scope="row">
										                              {config[infotype].list[n].name}
										                            </StyledTableCell>
										                            <StyledTableCell align="right">
										                              {product[infotype][n]}
										                            </StyledTableCell>
										                          </StyledTableRow>
										                        )
									                      	} else {
									                      		return null;
									                      	}
									                      } else {
									                        return null;
									                      }
									                    })}
									                  </TableBody>
									                </Table>
									              </TableContainer>
							            		</AccordionDetails>
								             </Accordion>
							            </div>
							          )
						        	}
						        })
						      }
								</div>
								<Grid container className={clsx(classes.marginTop)}>
									{Object.values(formikProps.errors).map((msg) => (
										<Grid item xs={12} key={msg} >
											<Typography className={classes.errorText} variant="body1" color="error" >
												{msg}
											</Typography>
										</Grid>
									))}
								</Grid>
								<>
									{
										error ?
										(
											<Grid container className={clsx(classes.marginTop)}>
												<Grid item xs={12} >
													<Typography className={classes.errorText} variant="body1" color="error" >
														{error}
													</Typography>
												</Grid>
											</Grid>
										) : null
									}
								</>
								<div className={clsx(classes.marginTop)}>
									<HandleFormProductButton 
										validateForm={formikProps.validateForm} 
										values={formikProps.values}
									/>
								</div>
							</Form>
						)}
					</Formik>
				</Grid>
			</Grid>
		</div>
	);
}
