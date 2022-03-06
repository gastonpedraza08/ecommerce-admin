const express = require('express');
const router = express.Router();
const handler = require('../handlers/shared');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);

router.post('/send-email', async (req, res) => {
	const { name, email, message } = req.body;
	const emailData = {
		from: process.env.EMAIL_FROM,
		to: process.env.EMAIL_TO,
		subject: name,
		html: `
				<h1>Contacto por el portafolio</h1>
				<p>${message}</p>
				<p>Email de contacto: ${email}</p>
			`
	};
	try {
		await sgMail.send(emailData);
		res.json({
			ok: true,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			error: 'No se pudo enviar el email'
		});
	}
});

router.post('/upload', async (req, res) => {
	try {
		const { files } = req.body;

		const result = await handler.upload(files);

		res.status(200).json({
			ok: true,
			message: 'upload successfully',
			result,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			error: 'Internal Error'
		});
	}
});


module.exports = router;