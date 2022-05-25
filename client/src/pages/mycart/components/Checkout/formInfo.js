export const formInfo = {
  id: "form-checkout",
  cardholderName: {
    id: "form-checkout__cardholderName",
    placeholder: "Holder name",
  },
  cardholderEmail: {
    id: "form-checkout__cardholderEmail",
    placeholder: "E-mail",
  },
  cardNumber: {
    id: "form-checkout__cardNumber",
    placeholder: "Card number",
  },
  cardExpirationMonth: {
    id: "form-checkout__cardExpirationMonth",
    placeholder: "MM",
  },
  cardExpirationYear: {
    id: "form-checkout__cardExpirationYear",
    placeholder: "YY",
  },
  securityCode: {
    id: "form-checkout__securityCode",
    placeholder: "Security code",
  },
  installments: {
    id: "form-checkout__installments",
    placeholder: "Installments",
  },
  identificationType: {
    id: "form-checkout__identificationType",
  },
  identificationNumber: {
    id: "form-checkout__identificationNumber",
    placeholder: "Identification number",
  },
  issuer: {
    id: "form-checkout__issuer",
    placeholder: "Issuer",
  },
};

export const handleSubmit = (cardForm, productDescription, setPaymentState) => {
	const {
		paymentMethodId,
		issuerId,
		cardholderEmail: email,
		amount,
		token,
		installments,
		identificationNumber,
		identificationType,
	} = cardForm.getCardFormData();

	fetch("http://localhost:5000/api/orders/process_payment", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			paymentDataReq: {
				token,
				issuerId,
				paymentMethodId,
				transactionAmount: Number(amount),
				installments: Number(installments),
				description: productDescription,
				payer: {
					email,
					identification: {
						type: identificationType,
						number: identificationNumber,
					},
				},
			}
		}),
	})
		.then(response => {
			return response.json();
		})
		.then(result => {
			if(!result.hasOwnProperty("error_message")) {
				setPaymentState({
					touched: true,
					error: false,
					errors: [],
					success: true,
					paymentInfo: {
						id: result.id,
						status: result.status,
						detail: result.detail,
					},
					isLoading: false
				});
			} else {
				setPaymentState({
					touched: true,
					error: true,
					errors: [{ message: result.error_message}],
					success: false,
					paymentInfo: {},
					isLoading: false
				});
			}
		})
		.catch(error => {
			setPaymentState({
				touched: true,
				error: true,
				errors: [{message: JSON.stringify(error)}],
				success: false,
				paymentInfo: {},
				isLoading: false,
			});
		});
}