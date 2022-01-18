const express = require('express');
const router = express.Router();
const handler = require('../handlers/products');

router.post('/', async (req, res) => {
	const productToPersist = req.body.product;
	try {
		const product = await handler.createProduct(productToPersist);
		res.json({
			ok: true,
			product
		});
	} catch (error) {
		res.status(500).json({
			ok: false
		});
		console.log(error);
	}
});

router.put('/:id', async (req, res) => {
	const productTopUpdate = req.params.id;
	const fieldsToUpdate = req.body.fieldsToUpdate;
	try {
		const result = await handler.updateProduct(productTopUpdate, fieldsToUpdate);
		if (result[0] === 1) {
			res.json({
				ok: true,
			});
		} else {
			res.status(400).json({
				ok: false,
				error: 'No se pudo actualizar el producto'
			});
		}
	} catch (error) {
		res.status(500).json({
			ok: false
		});
		console.log(error);
	}
});

router.delete('/:id', async (req, res) => {
	const productToDelete = req.params.id;
	try {
		const result = await handler.deleteProduct(productToDelete);
		if (result[0] === 1) {
			res.json({
				ok: true,
			});
		} else {
			res.status(400).json({
				ok: false,
			})
		}
	} catch (error) {
		res.status(500).json({
			ok: false,
		})
		console.log(error);
	}
});

router.get('/', async (req, res) => {
	try {
		const params = {
			limit: parseInt(req.query.limit) || 1000,
			order: req.query.order || 'DESC',
			orderBy: req.query.orderBy || 'id',
			from: parseInt(req.query.from) - 1 || 0
		};
		const result = await handler.getProducts(params);
		res.json({
			ok: true,
			products: result
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
		});
		console.log(error);
	}
});

router.get('/search', async (req, res) => {
	try {
		const result = await handler.searchProducts(req.query);
		res.json({
			ok: true,
			products: result
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
		});
		console.log(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const productId = parseInt(req.params.id);
		const product = await handler.getProductById(productId);
		if (product) {
			res.json({
				ok: true,
				product
			});
		} else {
			res.status(400).json({
				ok: false,
				error: `Ningun producto con el id ${productId}`
			});
		}
	} catch (error) {
		res.status(500).json({
			ok: false,
		});
		console.log(error);
	}
});

module.exports = router;