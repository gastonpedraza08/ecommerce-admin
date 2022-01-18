const express = require('express');
const router = express.Router();
const handler = require('../handlers/slides');

router.post('/', async (req, res) => {
	const slideToPersist = req.body.slide;
	try {
		const slide = await handler.createSlide(slideToPersist);
		res.json({
			ok: true,
			slide
		});
	} catch (error) {
		res.status(500).json({
			ok: false
		});
		console.log(error);
	}
});

router.put('/change-order', async (req, res) => {
	const slidesToUpdate = req.body.slides;
	try {
		const result = await handler.updateOrderSlides(slidesToUpdate);
		if (result[0][0]===1) {
			res.json({
				ok: true,
			});
		} else {
			res.status(400).json({
				ok: false,
				error: 'Error al actualizar las slides'
			});
		}
	} catch (error) {
		res.status(500).json({
			ok: false,
		});
		console.log(error);
	}
});

router.put('/:id', async (req, res) => {
	const slideTopUpdate = req.params.id;
	const isCurrentSelected = req.body.isCurrentSelected;
	try {
		const result = await handler.updateSlide(slideTopUpdate, isCurrentSelected);
		if (result[0]===1) {
			res.json({
				ok: true,
			});
		} else {
			res.status(400).json({
				ok: false,
				error: 'Se paso del limite de Slides Actuales (10)'
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
	const slideToDelete = req.params.id;
	try {
		const result = await handler.deleteSlide(slideToDelete);
		if (result === 1) {
			res.json({
				ok: true,
			});
		} else {
			res.status(400).json({
				ok: true,
			})
		}
	} catch (error) {
		res.status(500).json({
			ok: true,
		})
		console.log(error);
	}
});

router.get('/', async (req, res) => {
	try {
		const conditions = {
			isCurrentSelected: Boolean((req.query.isCurrentSelected || "").replace(/\s*(false)\s*/i, ""))
		};
		const params = {
			limit: parseInt(req.query.limit) || 10,
			order: req.query.order || 'ASC',
			orderBy: req.query.orderBy || 'id',
			from: parseInt(req.query.from) - 1 || 0
		};
		const result = await handler.getSlides(params, conditions);
		res.json({
			ok: true,
			count: result.count,
			slides: result.rows
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
		});
		console.log(error);
	}
});

module.exports = router;