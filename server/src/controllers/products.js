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

		if (result) {
			res.status(200).json({
				ok: true,
				oldProduct: result
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

		if (result.deletedCount === 1) {
			res.status(200).json({
				ok: true
			});
		} else {
			res.status(400).json({
				ok: false
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
		})
	}
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
		const result = await handler.getProducts(params, search);
		res.json({
			ok: true,
			count: result.count,
			products: result.rows
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
		});
	}
});

router.get('/search', async (req, res) => {
	let search = { limit: 30, ...req.query };
	let page = req.query.page;

	if (page) {
		if (page === 1) {
			search.from = 0;
		} else {
			search.from = page * search.limit;
		}
	}

	try {
		const result = await handler.searchProducts(search);
		res.json({
			ok: true,
			count: result.count,
			products: result.rows,
			numberOfPages: result.numberOfPages
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
		});
	}
});

router.get('/:id', async (req, res) => {
	try {
		const productId = req.params.id;
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
		console.log(error);
		res.status(500).json({
			ok: false,
		});
	}
});

router.delete('/bulk/delete', async (req, res) => {
	try {
		const ids = req.body.ids;
		const result = await handler.bulkDeleteProducts(ids);
		
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