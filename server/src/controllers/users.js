const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const jwt = require('jsonwebtoken');

sgMail.setApiKey(process.env.MAIL_KEY);

const handler = require('../handlers/users');
const { requireSignin, adminMiddleware } = require('./middlewares/auth');
const { updateUser } = require('./middlewares/express-validator/auth');
const { validate, createTokenAccountActivation } = require('../utils/commons');
const { errorHandler } = require('../utils/errorHandler');

/* CREATE USER */
router.post('/', async (req, res) => {
	const { enabled, email, password, ...rest } = req.body;
	try {
		let user = await handler.getUserByEmailWithSoftdelete(email);
		if (user) {
			return res.status(400).json({
				ok: false,
				error: 'Email is taken'
			});
		}
		
		const currentDateFormatted = enabled ? null : moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
		const token = createTokenAccountActivation({ email });

		const hash = bcrypt.hashSync(password, 10);
		let newUser = {
			...rest,
			email,
			password: hash,
			deletedAt: currentDateFormatted,
			state: enabled ? 'Verificado' : 'Deshabilitado'
		};

		const result = await handler.createUser(newUser, token, enabled);

		let userToReturn = result;
		userToReturn.password = undefined;

		console.log(userToReturn)

		if (result) {
			return res.status(200).json({
				ok: true,
				user: userToReturn
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

router.post('/multiple', async (req, res) => {
	const { users } = req.body;
	try {

		let hashedUsers = users.map(user => {
			const hash = bcrypt.hashSync(user.password, 10);
			return {
				...user,
				password: hash
			}
		});

		const result = await handler.bulkCreateUsers(hashedUsers);

		if (result) {
			const usersToReturn = result.map(user => {
				return {
					...user.dataValues,
					password: undefined
				}
			});

			return res.status(200).json({
				ok: true,
				users: usersToReturn
			});
		} else {
			return res.status(400).json({
				ok: false,
				error: 'Can not bulk create users'
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


router.get('/:id', async (req, res) => {
	const userId = req.params.id;
	const user = await handler.getUserById(userId);
	if (!user) {
		return res.status(400).json({
			ok: false,
			error: 'User not found'
		});
	}
	res.status(200).json({
		ok: true,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role.name,
		}
	});
});

router.get('/', async (req, res) => {
	try {
		const { limit, order, orderBy, from, page, ...rest } = req.query;
		const params = {
			limit: parseInt(limit) || undefined,
			order: order || 'DESC',
			orderBy: orderBy || 'createdAt',
			from: parseInt(from) - 1 || 0
		};

		if (page) {
			if (page === 1) {
				params.from = 0;
			} else {
				params.from = page * params.limit;
			}
		}

		//searchs
		let search = {
			...rest
		};


		const result = await handler.getUsers(params, search);
		res.json({
			ok: true,
			count: result.count,
			users: result.rows,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
		});
	}
});

router.put('/update/:id', updateUser, validate, requireSignin, async (req, res) => {
	const { name, email, password } = req.body;
	const user = await handler.getUserById(req.params.id);
	if (!user) {
		return res.status(400).json({
			ok: false,
			error: 'user not found'
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
	user.name = name;
	user.email = email;
	await user.save();
	res.status(200).json({
		ok: true,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role.name,
		}
	});
});

module.exports = router;