const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);

const sendEmailAccountActivation = (email, token) => {
	return new Promise((res, rej) => {
		const emailData = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: 'Account activation link',
			html: `
					<h1>Please use the following to activate your account</h1>
					<p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
					<hr />
					<p>This email may containe sensetive information</p>
					<p>${process.env.CLIENT_URL}</p>
				`
		};
		sgMail.send(emailData)
			.then(result => {
				res(true);
			})
			.catch(err => {
				rej(err)
			});
	});
};

const sendEmailResetPassword = async (email, token) => {
	const emailData = {
		from: process.env.EMAIL_FROM,
		to: email,
		subject: `Password Reset link`,
		html: `
            <h1>Please use the following link to reset your password</h1>
            <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>${process.env.CLIENT_URL}</p>
          `
	};
	await sgMail.send(emailData);
};

module.exports = {
	sendEmailAccountActivation,
	sendEmailResetPassword
};