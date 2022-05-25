import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from  'clsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Swal from "sweetalert2";

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

import { formInfo, handleSubmit } from './formInfo.js';

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
	marginTop: {
		marginTop: theme.spacing(2)
	}
}));

export default function Checkout(props) {
	const { setOpen } = props;
	const classes = useStyles();
	const { user } = useSelector(state => state.auth);
	const [mercadopago, setMercadpago] = useState(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [paymentState, setPaymentState] = useState({
    touched: false,
    error: false,
    errors: [],
    success: false,
    paymentInfo: {},
    isLoading: false
  });

  useEffect(() => {
  	if (paymentState.error) {
  		setOpen(false);
  		Swal.fire({
        icon: "error",
        title: "No se pudo procesar el pago.",
        text: "Rellena bien los datos o comunicate con tu banco.",
      });
  	}
  	if (paymentState.success) {
  		setOpen(false);
  		Swal.fire("Correcto!", "Pago realizado con éxito.", "success");
  	}
  }, [paymentState]);

  useEffect(() => {
   const script = document.createElement('script');

   script.onload = function() {
    setMercadpago(new window.MercadoPago("TEST-0bec7ef3-4a5c-4b19-bff8-82bf348e00b5"));
    setShouldMount(true);
   }
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    document.body.appendChild(script);
    //console.log(user)
  }, []);

  useEffect(() => {
  	function loadCardForm() {
  		const productCost = "100";
    	const productDescription = "descripcion sin html";

	  	const cardForm = mercadopago.cardForm({
	  		amount: productCost,
	      autoMount: true,
	      form: formInfo,
	      callbacks: {
	      	onFormMounted: error => {
	          if (error) {
	            return console.warn("Form Mounted handling error: ", error);
	          }
	          console.log("Form mounted");
	        },
	        onSubmit: event => {
	          if (paymentState.error) {
	            console.log("error")
	            return;
	          };
	          event.preventDefault();
	          handleSubmit(cardForm, productDescription, setPaymentState)
	        },
	        onFetching: (resource) => {
	          console.log("Fetching resource: ", resource);
	          setPaymentState(prev => {
	            return {
	              ...prev,
	              isLoading: true,
	            }
	          })
	          return () => {
	              setPaymentState(prev => {
	                return {
	                  ...prev,
	                  isLoading: false,
	                }
	              })
	          };
	        },
	        onError: (errors) => {
	          setPaymentState(prev => {
	            return {
	              ...prev,
	              error: true,
	              errors,
	            }
	          });
	        }
	      }
	  	});
		}

  	if(shouldMount) {
			loadCardForm();
		}
  }, [shouldMount]);

	return (
		<div>
			<Grid container justifyContent="center">
				<div className={classes.form}>
					<div>
						{/* INICIO CONTENIDO DEL CHECKOUT */}
						<form id="form-checkout">

							<Typography variant="h4">
				      	Personal Information
				      </Typography>

							{/* EMAIL */}
							<FormControl className={clsx(classes.marginTop)} fullWidth variant="outlined">
                <TextField
                  variant="outlined"
                  id="form-checkout__cardholderEmail"
                  type="email"
                  name="cardholderEmail"
                />
              </FormControl>

              <Grid container spacing={2} justifyContent="flex-start">
              	<Grid item>
		            	{/* identificationType */}
		            	<FormControl className={clsx(classes.marginTop)} variant="outlined">
		                <Select
					            native
					          	inputProps={{
					            	id: "form-checkout__identificationType",
					            	name: "identificationType"
					          	}}
					        	>
					        	</Select>
					        </FormControl>
              	</Grid>
              	<Grid item>
						      {/* docNumber */}
						      <FormControl className={clsx(classes.marginTop)} variant="outlined">
						      	<TextField 
						      		variant="outlined"
						      		id="form-checkout__identificationNumber"
						      		name="docNumber"
						      		type="text"
						      	/>
						      </FormControl>
              	</Grid>
              </Grid>

				      <Typography className={clsx(classes.marginTop)} variant="h4">
				      	Card Details
				      </Typography>

				    	{/* cardholderName */}
				      <FormControl className={clsx(classes.marginTop)} fullWidth variant="outlined">
				      	<TextField 
				      		variant="outlined"
				      		id="form-checkout__cardholderName"
				      		name="cardholderName"
				      		type="text"
				      	/>
				      </FormControl>

				    	{/* cardNumber */}
				      <FormControl className={clsx(classes.marginTop)} fullWidth variant="outlined">
				      	<TextField 
				      		variant="outlined"
				      		id="form-checkout__cardNumber"
				      		name="cardNumber"
				      		type="text"
				      	/>
				      </FormControl>

				    	{/* cardExpirationMonth and Year */}
				    	<Grid container spacing={2}>
				    		<Grid item xs>
						      <FormControl className={clsx(classes.marginTop)} variant="outlined">
						      	<TextField 
						      		variant="outlined"
						      		id="form-checkout__cardExpirationMonth"
						      		name="cardExpirationMonth"
						      		type="text"
						      	/>
						      </FormControl>
				    		</Grid>
				    		<Grid item xs>
						      <FormControl className={clsx(classes.marginTop)} variant="outlined">
						      	<TextField 
						      		variant="outlined"
						      		id="form-checkout__cardExpirationYear"
						      		name="cardExpirationYear"
						      		type="text"
						      	/>
						      </FormControl>
				    		</Grid>
				    		<Grid item xs>
						    	{/* securityCode */}
						      <FormControl className={clsx(classes.marginTop)} variant="outlined">
						      	<TextField
						      		variant="outlined"
						      		id="form-checkout__securityCode"
						      		name="securityCode"
						      		type="text"
						      	/>
						      </FormControl>
				    		</Grid>
				    	</Grid>


				      {/* issuer */}
            	<FormControl className={clsx(classes.marginTop)} fullWidth variant="outlined">
                <Select
			            native
			          	inputProps={{
			            	id: "form-checkout__issuer",
			            	name: "issuer"
			          	}}
			        	>
			        	</Select>
			        </FormControl>

				      {/* installments */}
            	<FormControl className={clsx(classes.marginTop)} fullWidth variant="outlined">
                <Select
			            native
			          	inputProps={{
			            	id: "form-checkout__installments",
			            	name: "installments"
			          	}}
			        	>
			        	</Select>
			        </FormControl>

			      	{/**/}
			      	<Button 
			      		variant="outlined" 
			      		color="primary" 
			      		type="submit"
			      		id="form-checkout__submit"
			      		disabled={paymentState.isLoading}
			      		className={clsx(classes.marginTop)}
			      	>
				        Pay
				      </Button>
						</form>

						{/* FIN CONTENIDO DEL CHECKOUT */}
					</div>
				</div>
			</Grid>
		</div>
	);
}
