const { ProductsSection, Product, Products_ProductsSection, Category, sequelize, Sequelize } = require('../../models');

const persist = async (productsSectionToPersist, productsId) => {
	let productsSection = await ProductsSection.create(productsSectionToPersist);
	let arrToCreate = productsId.map(id => {
		return {
			productId: id,
			productsSectionId: productsSection.dataValues.id
		};
	});
	const result = await Products_ProductsSection.bulkCreate(arrToCreate);
	const resultToReturn = await ProductsSection.findOne({
		where: {
			id: productsSection.id
		},
		include: [{model: Product}]
	});
	return resultToReturn;
};

const update = async (productsSectionToUpdate, fieldsToUpdate) => {
	const result = await ProductsSection.update({ ...fieldsToUpdate },
		{
			where: {
				id: productsSectionToUpdate
			}
		});
	return result;
};

const getProductsSection = async params => {
	const result = await ProductsSection.findAll({
		limit: params.limit,
		offset: params.from,
		include: [{model: Product}]
	});
	return result;
};

const getProductsSectionById = async productsSectionId => {
	const result = await ProductsSection.findOne({
		where: {
			id: productsSectionId
		},
		includes: [{model: Product}]
	});
	return result;
};

const destroy = async productsSectionToDelete => {
	const result = await ProductsSection.destroy({
		where: {
			id: productsSectionToDelete
		}
	});
	return result;
};

module.exports = {
	persist,
	update,
	getProductsSection,
	getProductsSectionById,
	destroy,
};