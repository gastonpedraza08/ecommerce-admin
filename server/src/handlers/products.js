const jwt = require('jsonwebtoken');

const repository = require('../services/repositories/products');
const { uploadFile } = require('../services/external/s3');

const getProducts = async (params, search) => {
	const products = await repository.getProducts(params, search);
	return products;
};

const searchProducts = async params => {
	const products = await repository.searchProducts(params);
	return products;
};

const getProductById = async productId => {
	const product = await repository.getProductById(productId);
	return product;
};

const createProduct = async productToPersist => {
	const product = await repository.persist(productToPersist);
	return product;
};

const updateProduct = async (productToUpdate, fieldsToUpdate) => {
	const result = await repository.update(productToUpdate, fieldsToUpdate);
	return result;
};

const deleteProduct = async productToDelete => {
	const result = await repository.destroy(productToDelete);
	return result;
};

const bulkDeleteProducts = async ids => {
	const result = await repository.bulkDeleteProducts(ids);
	return result;
} 

const getProductsByIds = async ids => {
	const result = await repository.getProductsByIds(ids);
	return result;
}

module.exports = {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductById,
	searchProducts,
	bulkDeleteProducts,
	getProductsByIds,
};