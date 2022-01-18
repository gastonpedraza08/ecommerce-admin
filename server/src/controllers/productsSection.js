const express = require('express');
const router = express.Router();
const handler = require('../handlers/productsSection');

router.post('/', async (req, res) => {
	const productsSectionToPersist = req.body.productsSection;
	const productsId = req.body.productsId;
	try {
		const productsSection = await handler.createProductsSection(productsSectionToPersist, productsId);
		if (productsSection) {
			res.json({
				ok: true,
				productsSection
			});
		} else {
			res.status(400).json({
				ok: false,
				error: 'No se pudo crear la sección'
			});
		}
	} catch (error) {
		res.status(500).json({
			ok: false
		});
		console.log(error);
	}
});

router.put('/:id', async (req, res) => {
	const productsSectionToUpdate = req.params.id;
	const fieldsToUpdate = req.body.fieldsToUpdate;
	try {
		const result = await handler.updateProductsSection(productsSectionToUpdate, fieldsToUpdate);
		if (result[0] === 1) {
			res.json({
				ok: true,
			});
		} else {
			res.status(400).json({
				ok: false,
				error: 'No se pudo actualizar la sección'
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
	const productsSectionToDelete = req.params.id;
	try {
		const result = await handler.deleteProductsSection(productsSectionToDelete);
		if (result === 1) {
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
			from: parseInt(req.query.from) - 1 || 0
		};
		const result = await handler.getProductsSection(params);
		res.json({
			ok: true,
			productsSections: result
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
		const productsSectionId = parseInt(req.params.id);
		const productsSection = await handler.getProductsSectionById(productsSectionId);
		if (productsSection) {
			res.json({
				ok: true,
				productsSection
			});
		} else {
			res.status(400).json({
				ok: false,
				error: `Ninguna Sección con el id ${productsSectionId}`
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