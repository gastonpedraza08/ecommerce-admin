const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	const errorsToResponse = errors.array().map(error => error.msg);
	return res.status(400).json({
		ok: false,
		error: 'invalid fields',
		errors: errorsToResponse
	});
};

const createTokenAccountActivation = (data) => {
	return jwt.sign({ ...data },
		process.env.JWT_ACCOUNT_ACTIVATION,
		{ expiresIn: '7d' }
	);
};

module.exports = {
	validate,
	createTokenAccountActivation,
};