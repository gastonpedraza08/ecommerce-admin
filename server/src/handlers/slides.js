const jwt = require('jsonwebtoken');

const repository = require('../services/repositories/slides');
const { uploadFile } = require('../services/external/s3');

const getSlides = async (params, conditions) => {
	const slides = await repository.getSlides(params, conditions);
	return slides;
};

const createSlide = async slideToPersist => {
	const { base64, name } = slideToPersist;
	const result = await uploadFile(base64, name);
	const slideUrl = result.Location;
	const slide = await repository.persist({ image: slideUrl });
	return slide;
};

const updateSlide = async (slideToUpdate, isCurrentSelected) => {
	let result;
	if (isCurrentSelected) {
		result = await repository.addToCurrent(slideToUpdate, isCurrentSelected);
	} else {
		result = await repository.update(slideToUpdate, { isCurrentSelected });
	}
	return result;
};

const updateOrderSlides = async (slidesToUpdate) => {
	let promises = [];
	for (let i = 0; i < slidesToUpdate.length; i++) {
		promises.push(repository.update(slidesToUpdate[i], { order: i + 1 }));
	}
	const result = await Promise.all(promises);
	return result;
};

const deleteSlide = async slideToDelete => {
	const result = await repository.destroy(slideToDelete);
	return result;
};

module.exports = {
	getSlides,
	createSlide,
	updateSlide,
	deleteSlide,
	updateOrderSlides
};