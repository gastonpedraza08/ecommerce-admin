import React, { useState, useEffect, useRef } from 'react';
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
	const classes = useStyles();
	const { user } = useSelector(state => state.auth);
	const [userPaymentInfo, setUserPaymentInfo] = useState(() => {
		let data = localStorage.getItem('userPaymentInfo');
		if (data) {
			return JSON.parse(data);
		} else {
			return {
				fullName: '',
				address: '',
				referenceAddress: ''
			}
		}
	});

	let fullNameRef = useRef();
	fullNameRef.current = userPaymentInfo.fullName
	let addressRef = useRef();
	addressRef.current = userPaymentInfo.address
	let referenceAddressRef = useRef();
	referenceAddressRef.current = userPaymentInfo.referenceAddress

	useEffect(() => {
		return () => {
			localStorage.setItem('userPaymentInfo', JSON.stringify({
				fullName: fullNameRef.current,
				address: addressRef.current,
				referenceAddress: referenceAddressRef.current,
			}));
		}
	}, []);

	const handleChange = e => {
		setUserPaymentInfo(prev => {
			return {
				...prev,
				[e.target.name]: e.target.value
			}
		})
	}

	return (
		<div>
			<Grid container justifyContent="center">
				<div className={classes.form}>
					<div>
						{/* INICIO CONTENIDO DEL CHECKOUT */}
						<div>

							<Typography variant="h4">
				      	User Information
				      </Typography>

							{/* FULLNAME */}
							<FormControl className={clsx(classes.marginTop)} fullWidth variant="outlined">
                <TextField
                  variant="outlined"
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={userPaymentInfo.fullName}
                  onChange={handleChange}
                />
              </FormControl>

	            	{/* address */}
	            	<FormControl fullWidth className={clsx(classes.marginTop)} variant="outlined">
	                <TextField
	                  variant="outlined"
	                  type="text"
	                  name="address"
	                  placeholder="Address"
	                  value={userPaymentInfo.address}
	                  onChange={handleChange}
	                />
				        </FormControl>

					      {/* Reference */}
					      <FormControl fullWidth className={clsx(classes.marginTop)} variant="outlined">
					      	<TextField
					          label="Reference"
					          multiline
					          name="referenceAddress"
					          rows={4}
					          variant="outlined"
					          value={userPaymentInfo.referenceAddress}
					          onChange={handleChange}
					        />
					      </FormControl>
						</div>
					</div>
				</div>
			</Grid>
		</div>
	);
}
