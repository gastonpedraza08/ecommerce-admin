const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const moment = require('moment');

const handler = require('../handlers/users');
const {
	sendEmailAccountActivation,
	sendEmailResetPassword
} = require('../services/external/emailSender');
const { 
	validate, 
	createTokenAccountActivation
} = require('../utils/commons');
const {
	validSign,
	validLogin,
	forgotPasswordValidator,
	resetPasswordValidator
} = require('./middlewares/express-validator/auth');
const { errorHandler } = require('../utils/errorHandler');
const { requireSignin } = require('./middlewares/auth');


const updateUser = async (user, updatedFields) => {
	user = _.extend(user, updatedFields);
	return user.save();
};

router.post('/register', async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		let user = await handler.getUserByEmailWithSoftdelete(email);
		if (user) {
			if (!user.deletedAt) {
				return res.status(400).json({
					ok: false,
					error: 'Email is taken'
				});
			} else {
				return res.status(400).json({
					ok: false,
					error: 'The activation code has already been sent to the email provided',
				});
			}
		}
		
		const currentDateFormatted = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
		const token = createTokenAccountActivation({ firstName, lastName, email });

		const hash = bcrypt.hashSync(password, 10);
		let newUser = {
			firstName,
			lastName,
			email,
			password: hash,
			deletedAt: currentDateFormatted,
			info: {
				productsInCart: []
			}
		};

		const result = await handler.createUser(newUser, token);

		if (result) {
			return res.status(200).json({
				ok: true,
			});
		} else {
			return res.status(400).json({
				ok: false,
				error: 'Can not create the user'
			});
		}
	} catch (error) {
		const errorToReturn = errorHandler(error);
		res.status(errorToReturn.status).json({
			ok: false,
			error: errorToReturn.message
		});
	}
});

const createAccessToken = (user) => {
	return jwt.sign(user.dataValues, process.env.JWT_SECRET, { expiresIn: '7d' });
}

router.post('/activation', async (req, res) => {
	try {
		const authorization = req.get('Authorization');
		if (!authorization) {
			return res.status(400).json({
				ok: false,
				error: 'Missing token'
			});
		}
		const token = authorization.split(' ')[1];

		jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async (err, decoded) => {
			if (err) {
				console.log(err)
				return res.status(401).json({
					ok: false,
					error: 'Expired link'
				});
			} else {
				const { email } = decoded;
				let user = await handler.getUserByEmailWithSoftdelete(email);
				if (!user) {
					return res.status(400).json({
						ok: false,
						error: 'User with that email does not exist'
					});
				}

				await user.restore();

				res.status(200).json({
					ok: true,
					message: 'Activation success'					
				});
			}
		});
	} catch (error) {
		const errorToReturn = errorHandler(error);
		res.status(errorToReturn.status).json({
			ok: false,
			error: errorToReturn.message
		});
	}
});


router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await handler.getUserByEmail(email);
		if (!user) {
			return res.status(400).json({
				ok: false,
				error: 'user with that email does not exist'
			});
		}
		const hashed_password = user.password;
		const isAuthenticated = bcrypt.compareSync(password, hashed_password);
		if (!isAuthenticated) {
			return res.status(400).json({
				ok: false,
				error: 'invalid credentials'
			});
		}
		const { id } = user;
		user.password = undefined;

		const token = createAccessToken(user);

		return res.status(200).json({
			ok: true,
			token,
			user
		});
	} catch (error) {
		const errorToReturn = errorHandler(error);
		res.status(errorToReturn.status).json({
			ok: false,
			error: errorToReturn.message
		});
	}
});

router.post('/renewtoken',  (req, res) => {

	const authorization = req.get('Authorization');
	if (!authorization) {
		return res.status(400).json({
			ok: false,
			error: 'missing token'
		});
	}

	const token = authorization.split(' ')[1];

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			return res.status(401).json({
				ok: false,
				error: 'invalid token'
			});
		} else {
			const user = await handler.getUserByIdWithSoftdelete(decoded.id);
			console.log(user)
			return res.status(200).json({
				ok: true,
				token,
				user
			});
		}
	});
});


router.put('/forgotpassword', forgotPasswordValidator, validate, async (req, res) => {
	try {
		const { email } = req.body;
		const user = await handler.getUserByEmail(email);
		if (!user) {
			return res.status(404).json({
				ok: false,
				error: 'user with that email does not exist'
			});
		}
		const token = jwt.sign({ id: user.id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '15m' });
		user.resetPasswordLink = token;
		const result = await user.save();
		if (!result) {
			return res.status(400).json({
				ok: false,
				error: 'database error on user password forgot request'
			});
		}
		sendEmailResetPassword(email, token);
		return res.status(200).json({
			ok: true,
			message: `email has been sent to ${email}`
		});
	} catch (error) {
		const errorToReturn = errorHandler(error);
		res.status(errorToReturn.status).json({
			ok: false,
			error: errorToReturn.message
		});
	}
});


router.put('/resetpassword', resetPasswordValidator, validate, async (req, res) => {
	try {
		const { resetPasswordToken, newPassword } = req.body;
		if (!resetPasswordToken) {
			return res.status(200).json({
				ok: false,
				error: 'invalid token'
			});
		}
		jwt.verify(resetPasswordToken, process.env.JWT_RESET_PASSWORD, async (err, decoded) => {
			if (err) {
				return res.status(400).json({
					error: 'expired link'
				});
			}
			let user = await handler.getUserByResetPasswordLink(resetPasswordToken);
			if (!user) {
				return res.status(400).json({
					ok: false,
					error: 'user does not exist'
				});
			}
			const hash = bcrypt.hashSync(newPassword, 10);
			const updatedFields = {
				password: hash,
				resetPasswordLink: ''
			};
			user = _.extend(user, updatedFields);
			await user.save();
			return res.status(200).json({
				ok: true,
				message: 'you can login with your new password'
			});
		});
	} catch (error) {
		const errorToReturn = errorHandler(error);
		res.status(errorToReturn.status).json({
			ok: false,
			error: errorToReturn.message
		});
	}
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
// Google Login
router.post('/googlelogin', async (req, res) => {
	try {
		const { idToken } = req.body;
		const response = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT });
		const { email_verified, name: googleName, email: googleEmail } = response.payload;
		if (!email_verified) {
			return res.status(400).json({
				error: 'google login failed'
			});
		}
		const user = await handler.getUserByEmail(googleEmail);
		if (user) {
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: '7d'
			});
			const { id, email, name, roleId } = user;
			return res.status(200).json({
				ok: true,
				token,
				user: { id, email, name, roleId }
			});
		} else {
			const password = bcrypt.hashSync(googleEmail + process.env.JWT_SECRET, 10);
			const userToPersist = {
				name: googleName,
				email: googleEmail,
				password
			};
			const user = await handler.createUser(userToPersist);
			if (!user) {
				return res.status(400).json({
					ok: false,
					error: 'failed signup user with google'
				});
			}
			const token = jwt.sign(
				{ id: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: '7d' }
			);
			const { id, email, name, roleId } = user;
			return res.status(200).json({
				ok: true,
				token,
				user: { id, email, name, roleId }
			});
		}
	} catch (error) {
		const errorToReturn = errorHandler(error);
		res.status(errorToReturn.status).json({
			ok: false,
			error: errorToReturn.message
		});
	}
});

router.post('/facebooklogin', async (req, res) => {
	try {
		const { userID, accessToken } = req.body;
		const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
		const response = await axios.get(url);
		const { email, name } = response.data;
		const user = await handler.getUserByEmail(email);
		if (user) {
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: '7d'
			});
			const { id, roleId } = user;
			res.status(200).json({
				ok: true,
				token,
				user: { id, email, name, roleId }
			});
		} else {
			const password = bcrypt.hashSync(email + process.env.JWT_SECRET, 10);
			const user = await handler.createUser({ name, email, password });
			if (!user) {
				return res.status(400).json({
					ok: false,
					error: 'failed signup user with google'
				});
			}
			const token = jwt.sign(
				{ id: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: '7d' }
			);
			const { id, roleId } = user;
			res.status(200).json({
				ok: true,
				token,
				user: { id, email, name, roleId }
			});
		}
	} catch (error) {
		const errorToReturn = errorHandler(error);
		res.status(errorToReturn.status).json({
			ok: false,
			error: errorToReturn.message
		});
	}
});


module.exports = router;