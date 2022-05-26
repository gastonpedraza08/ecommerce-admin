const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const jwt = require('jsonwebtoken');

sgMail.setApiKey(process.env.MAIL_KEY);

const handler = require('../handlers/users');
const productHandler = require('../handlers/products');
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

router.get('/mycart/:id', async (req, res) => {
	try {
		let userId = req.params.id;
		let user = await handler.getUserById(userId);
		let productsInCartId;
		if (typeof user.info === "string") {
			productsInCartId = JSON.parse(user.info).productsInCart;
		} else {
			productsInCartId = user.info.productsInCart;
		}
		let result = await productHandler.getProductsByIds(productsInCartId);

		let products = result.map(pro => {
			for (let i = 0; i < productsInCartId.length; i++) {
				if (pro._id == productsInCartId[i]._id) {
					return {
						count: productsInCartId[i].count,
						_id: pro._doc._id,
						name: pro._doc.name,
						price: pro._doc.price,
						sku: pro._doc.sku,
						thumbnail: pro._doc.thumbnail,
						condition: pro._doc.condition,
						description: pro._doc.description,
						categoryId: pro._doc.categoryId,
						stock: pro._doc.stock,
						state: pro._doc.state,
						images: pro._doc.images,
					}
				}
			}
			return pro._doc
		})

		res.status(200).json({
			ok: true,
			products,
			user
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			error: 'Error en el servidor'
		});
		console.log(error);
	}
});


router.put('/mycart/:id', async (req, res) => {
	let productId = req.body.productId;

	const user = await handler.getUserByIdWithSoftdelete(req.params.id);
	if (!user) {
		return res.status(400).json({
			ok: false,
			error: 'user not found'
		});
	}

	let productsInCart = user.info.productsInCart;

	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i]._id === productId) {
			if (productsInCart[i].count > 1) {
				productsInCart[i].count--;
			} else {
				productsInCart.splice(i, 1);
			}
		}
	}

	user.info = {
		...user.info,
		productsInCart
	};

	user.changed("info", true);

	await user.save();

	user.password = undefined;

	res.status(200).json({
		ok: true,
		user
	});
});

module.exports = router;