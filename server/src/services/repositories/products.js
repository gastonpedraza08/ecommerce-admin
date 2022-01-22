const { Product, Category, sequelize, Sequelize } = require('../../models');
const { getFilterLine } = require('../../utils/commons');

const persist = async productToPersist => {
	const result = await Product.create(productToPersist);
	return result;
};

const update = async (productToUpdate, fieldsToUpdate) => {
	const result = await Product.update({ ...fieldsToUpdate },
		{
			where: {
				id: productToUpdate
			}
		});
	return result;
};

const getProducts = async params => {
	const result = await Product.findAll({
		limit: params.limit,
		offset: params.from,
		order: [[params.orderBy, params.order]],
	});
	return result;
};

/*

SELECT name, info->>"$.memory.ram_memory_gb" AS ram FROM Products 
WHERE (name LIKE '%android negro%'
OR (info LIKE '%android%'
AND info LIKE '%negro%'))
AND info->>"$.memory.ram_memory_gb">2
ORDER BY
  CASE
		WHEN name LIKE '%android negro%' THEN 1
		WHEN info LIKE '%android%' AND info LIKE '%negro%' THEN 2
  END;

*/

const searchProducts = async params => {
	const searchArr = params.search.split(' ');
	const sqlSelect = `SELECT id, name, description, thumbnail, price FROM Products`;
	const sqlSearch = `name LIKE "%${searchArr.join(' ')}%"`;
	const sqlInfoArr = searchArr.map(item => {
		return (
			`infoHelper LIKE "%${item}%"`
		);
	});
	const sqlSecondSearch = sqlInfoArr.join(' AND ');
	let sqlFullSearch = sqlSelect + ' WHERE (' + sqlSearch + ' OR (' + sqlSecondSearch + '))';
	delete params.search;
	for (let prop in params) {
		sqlFullSearch += ' ' + getFilterLine(prop, params);
	}
	const sqlOrder1 = `WHEN name LIKE "%${searchArr.join(' ')}%" THEN 1`;
	const sqlOrder2 = `WHEN ${sqlSecondSearch} THEN 2`;
	const fullOrder = 'ORDER BY CASE ' + sqlOrder1 + ' ' + sqlOrder2 + ' END;';
	sqlFullSearch += ' ' + fullOrder;
	const result = await sequelize.query(sqlFullSearch, { type: Sequelize.QueryTypes.SELECT });
	return result;
};

const getProductsById = async arrIds => {
	const result = await Product.findAll({
		where: {
			id: arrIds
		}
	});
	const resultToReturn = [];
	for (let i = 0; i < arrIds.length; i++) {
		const product = result.find(prod => prod.id == arrIds[i]);
		resultToReturn.push(product);
	}
	return resultToReturn;
};

const getProductById = async productId => {
	const result = await Product.findOne({
		where: {
			id: productId
		}
	});
	return result;
};

const destroy = async productToDelete => {
	const result = await Product.destroy({
		where: {
			id: productToDelete
		}
	});
	return result;
};

module.exports = {
	persist,
	update,
	getProducts,
	destroy,
	getProductById,
	getProductsById,
	searchProducts
};