const express = require('express');
const router = express.Router();
const mercadopago = require("mercadopago");

const handler = require('../handlers/orders');

mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_SAMPLE_ACCESS_TOKEN);

router.get('/', async (req, res) => {
  try {
    const params = {
      limit: parseInt(req.query.limit) || 10,
      order: req.query.order || 'ASC',
      orderBy: req.query.orderBy || 'id',
      from: parseInt(req.query.from) - 1 || 0
    };
    const result = await handler.getOrders(params);
    res.json({
      ok: true,
      count: result.count,
      orders: result.rows
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
    });
    console.log(error);
  }
});

router.post("/process_payment", (req, res) => {
  const { paymentDataReq } = req.body;
  const { payer, products } = paymentDataReq;

  const paymentData = {
    transaction_amount: Number(paymentDataReq.transactionAmount),
    token: paymentDataReq.token,
    description: paymentDataReq.description,
    installments: Number(paymentDataReq.installments),
    payment_method_id: paymentDataReq.paymentMethodId,
    issuer_id: paymentDataReq.issuerId,
    payer: {
      email: payer.email,
      identification: {
        type: payer.identification.type,
        number: payer.identification.number
      }
    }
  };

  mercadopago.payment.save(paymentData)
    .then(function(response) {
      const { response: data } = response;
      let order = {
        info: {
          paymentData,
          paymentResult: {
            detail: data.status_detail,
            status: data.status,
            id: data.id
          },
          products,
        },
        userId: payer.id,
        ammount: paymentData.transaction_amount,
        shippingAddress: payer.address,
        referenceAddress: payer.referenceAddress,
        fullName: payer.fullName,
        orderEmail: payer.email,
        orderDate: new Date(),
        orderStatus: data.status,
      }

      handler.createOrder(order).then(result => {
        res.status(201).json({
          detail: data.status_detail,
          status: data.status,
          id: data.id,
          order: result
        });
      });

    })
    .catch(function(error) {
      console.log(error);
      const { errorMessage, errorStatus }  = validateError(error);
      res.status(errorStatus).json({ error_message: errorMessage });
    });
});

function validateError(error) {
  let errorMessage = 'Unknown error cause';
  let errorStatus = 400;

  if(error.cause) {
    const sdkErrorMessage = error.cause[0].description;
    errorMessage = sdkErrorMessage || errorMessage;

    const sdkErrorStatus = error.status;
    errorStatus = sdkErrorStatus || errorStatus;
  }

  return { errorMessage, errorStatus };
}

module.exports = router;