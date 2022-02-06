const jwt = require('jsonwebtoken');

//const repository = require('../services/repositories/productsSection');
//const productsRepository = require('../services/repositories/products');

const getProductsSection = async params => {
	const productsSection = await repository.getProductsSection(params);
	return productsSection;
};

const getProductsSectionById = async productsSectionId => {
	const productsSection = await repository.getProductsSectionById(productsSectionId);
	return productsSection;
};

const createProductsSection = async (productsSectionToPersist, productsId) => {
	const productsSection = await repository.persist(productsSectionToPersist, productsId);
	return productsSection;
};

const updateProductsSection = async (productsSectionToUpdate, fieldsToUpdate) => {
	const result = await repository.update(productsSectionToUpdate, fieldsToUpdate);
	return result;
};

const deleteProductsSection = async productsSectionToDelete => {
	const result = await repository.destroy(productsSectionToDelete);
	return result;
};

module.exports = {
	getProductsSection,
	getProductsSectionById,
	createProductsSection,
	updateProductsSection,
	deleteProductsSection,
};