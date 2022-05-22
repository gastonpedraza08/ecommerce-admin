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
		};

		const result = await handler.createUser(newUser, token, enabled);

		let userToReturn = result;
		userToReturn.password = undefined;

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

router.get('/:id', async (req, res) => {
	const userId = req.params.id;
	const user = await handler.getUserByIdWithSoftdelete(userId);
	if (!user) {
		return res.status(400).json({
			ok: false,
			error: 'User not found'
		});
	}
	user.password = undefined;
	res.status(200).json({
		ok: true,
		user
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

router.put('/:id', async (req, res) => {
	let fieldsToUpdate = req.body.fieldsToUpdate;

	const user = await handler.getUserByIdWithSoftdelete(req.params.id);
	if (!user) {
		return res.status(400).json({
			ok: false,
			error: 'user not found'
		});
	}

	if (fieldsToUpdate.password) {
		const hash = bcrypt.hashSync(fieldsToUpdate.password, 10);
		user.password = hash;
		delete fieldsToUpdate.password;
	}

	if (fieldsToUpdate.enabled !== undefined) {
		const enabled = fieldsToUpdate.enabled;

		const currentDateFormatted = enabled ? null : moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

		user.deletedAt = currentDateFormatted;

		delete fieldsToUpdate.enabled;
	}

	for (let prop in fieldsToUpdate) {
		user[prop] = fieldsToUpdate[prop];
	}

	await user.save();

	user.password = undefined;

	res.status(200).json({
		ok: true,
		user
	});
});

router.delete('/bulk/delete', async (req, res) => {
	try {
		const ids = req.body.ids;
		const result = await handler.bulkDeleteUsers(ids);
		
		res.status(200).json({
			ok: true,
			result
		});

	} catch (error) {
		res.status(500).json({
			ok: false,
			error: 'Error en el servidor'
		});
		console.log(error);
	}
});

module.exports = router;